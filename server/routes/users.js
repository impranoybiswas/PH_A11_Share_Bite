import express from "express";
import { ObjectId } from "mongodb";

export default (connectDB) => {
  const router = express.Router();

  // 🧠 In-memory cache (to reduce DB hits for frequent reads)
  let cachedUsers = null;
  let lastFetchTime = 0;
  const CACHE_DURATION = 10000; // 10 seconds

  // 🔄 Helper: fetch users with caching
  const getUsers = async (db) => {
    const now = Date.now();
    if (cachedUsers && now - lastFetchTime < CACHE_DURATION) {
      return cachedUsers;
    }
    cachedUsers = await db.collection("users").find({}).toArray();
    lastFetchTime = now;
    return cachedUsers;
  };

  // ✅ 1. Get all users or a single user by email
  router.get("/", async (req, res) => {
    try {
      const db = await connectDB();
      const userCollection = db.collection("users");

      const { email } = req.query;
      if (email) {
        const user = await userCollection.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.json(user);
      }

      const users = await getUsers(db);
      res.json(users);
    } catch (err) {
      console.error("❌ Failed to fetch users:", err);
      res.status(500).json({
        message: "Failed to fetch users",
        error: err.message,
      });
    }
  });

  // ✅ 2. Create a new user
  router.post("/", async (req, res) => {
    try {
      const db = await connectDB();
      const userCollection = db.collection("users");

      const newUser = req.body;
      if (!newUser || !newUser.email) {
        return res.status(400).json({ message: "User email is required" });
      }

      const existing = await userCollection.findOne({ email: newUser.email });
      if (existing) {
        return res
          .status(409)
          .json({ message: "User with this email already exists" });
      }

      const result = await userCollection.insertOne(newUser);
      cachedUsers = null; // invalidate cache

      res.status(201).json({
        message: "User created successfully",
        id: result.insertedId,
      });
    } catch (err) {
      console.error("❌ Failed to create user:", err);
      res.status(500).json({
        message: "Failed to create user",
        error: err.message,
      });
    }
  });

  // ✅ 3. Update user by email (PUT /?email=someone@example.com)
  router.put("/", async (req, res) => {
    try {
      const db = await connectDB();
      const userCollection = db.collection("users");

      const email = req.query.email;
      if (!email) {
        return res
          .status(400)
          .json({ message: "Query parameter `email` is required" });
      }

      const updates = req.body;
      if (!updates || Object.keys(updates).length === 0) {
        return res
          .status(400)
          .json({ message: "Request body must contain fields to update" });
      }

      // Prevent accidental replacement of email or _id unless intended
      delete updates._id;
      delete updates.email;

      const result = await userCollection.findOneAndUpdate(
        { email },
        { $set: updates },
        { returnDocument: "after" } // return the document AFTER the update
      );

      if (result.matchedCount === 0) {
        // matchedCount === 0 -> no user found
        return res.status(404).json({ message: "User not found" });
      }

      // invalidate cache
      cachedUsers = null;

      res.json({
        message: "User updated successfully",
        user: result.value,
      });
    } catch (err) {
      console.error("❌ Failed to update user:", err);
      res.status(500).json({
        message: "Failed to update user",
        error: err.message,
      });
    }
  });

  // ✅ 4. Delete user by ID (optional)
  router.delete("/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const userCollection = db.collection("users");

      const { id } = req.params;
      const result = await userCollection.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      cachedUsers = null;
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("❌ Failed to delete user:", err);
      res.status(500).json({
        message: "Failed to delete user",
        error: err.message,
      });
    }
  });

  return router;
};
