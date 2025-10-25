import express from "express";
import { ObjectId } from "mongodb";

export default (connectDB) => {
  const router = express.Router();

  // 🧠 Simple cache system
  let cachedFoods = null;
  let lastFetchTime = 0;
  const CACHE_DURATION = 10000; // 10 seconds

  const getFoods = async () => {
    const now = Date.now();
    if (cachedFoods && now - lastFetchTime < CACHE_DURATION) {
      return cachedFoods;
    }

    const db = await connectDB();
    cachedFoods = await db.collection("foods").find({}).toArray();
    lastFetchTime = now;
    return cachedFoods;
  };

  // ✅ Get all foods OR filter by author
  router.get("/", async (req, res) => {
    try {
      const db = await connectDB();
      const foodCollection = db.collection("foods");

      const { author } = req.query;

      let query = {};
      if (author) {
        query = { author }; // filter foods added by this user
      }

      const foods = await foodCollection.find(query).toArray();

      if (foods.length === 0) {
        return res.status(404).json({
          message: email
            ? `No foods found for user: ${email}`
            : "No foods found in the database",
        });
      }

      res.json(foods);
    } catch (err) {
      console.error("❌ Failed to fetch foods:", err);
      res.status(500).json({
        message: "Failed to fetch foods",
        error: err.message,
      });
    }
  });

  // ✅ Get foods ordered by specific email
  router.get("/order", async (req, res) => {
    try {
      const { email } = req.query;

      if (!email) return res.status(400).json({ message: "Email is required" });
      const db = await connectDB();
      const foodsCollection = db.collection("foods");

      let query = {};

      // যদি email query parameter থাকে, তাহলে সেই user এর ordered foods খুঁজবে
      if (email) {
        query["order_by.user"] = email;
      }

      const foods = await foodsCollection.find(query).toArray();

      if (!foods.length) {
        return res
          .status(404)
          .json({ message: "No foods found for this user" });
      }

      res.json(foods);
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch foods",
        error: err.message,
      });
    }
  });

  // ✅ Get single food by ID
  router.get("/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const food = await db
        .collection("foods")
        .findOne({ _id: new ObjectId(req.params.id) });

      if (!food) return res.status(404).json({ message: "Food not found" });

      res.json(food);
    } catch (err) {
      res.status(500).json({
        message: "Failed to fetch food",
        error: err.message,
      });
    }
  });

  

  // ✅ Add new food
  router.post("/", async (req, res) => {
    try {
      const db = await connectDB();
      const result = await db.collection("foods").insertOne(req.body);
      cachedFoods = null;
      res.status(201).json({ message: "Food added", id: result.insertedId });
    } catch (err) {
      res.status(500).json({
        message: "Failed to add food",
        error: err.message,
      });
    }
  });

  // ✅ Update food by ID
  router.put("/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const result = await db
        .collection("foods")
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

      if (result.modifiedCount === 0)
        return res
          .status(404)
          .json({ message: "Food not found or no changes" });

      cachedFoods = null;
      res.json({ message: "Food updated" });
    } catch (err) {
      res.status(500).json({
        message: "Failed to update food",
        error: err.message,
      });
    }
  });

  // ✅ Delete food by ID
  router.delete("/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const result = await db
        .collection("foods")
        .deleteOne({ _id: new ObjectId(req.params.id) });

      if (result.deletedCount === 0)
        return res.status(404).json({ message: "Food not found" });

      cachedFoods = null;
      res.json({ message: "Food deleted" });
    } catch (err) {
      res.status(500).json({
        message: "Failed to delete food",
        error: err.message,
      });
    }
  });

  return router;
};
