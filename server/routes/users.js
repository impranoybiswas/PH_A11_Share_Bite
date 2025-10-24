import { Router } from "express";

export default (connectDB) => {
  const router = Router();

  // GET all users or single user by email
  router.get("/", async (req, res) => {
    try {
      const db = await connectDB();
      const email = req.query.email;

      if (email) {
        const user = await db.collection("users").findOne({ email });
        return res.json(user || {}); // return empty object if not found
      }

      const users = await db.collection("users").find({}).toArray();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // POST add user
  router.post("/add", async (req, res) => {
    try {
      const db = await connectDB();
      const { email, name } = req.body;

      if (!email) return res.status(400).json({ message: "Missing email" });

      const existing = await db.collection("users").findOne({ email });
      if (existing) return res.status(400).json({ message: "User exists" });

      const result = await db.collection("users").insertOne({ email, name });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add user" });
    }
  });

  router.patch("/update/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const updatedData = req.body;
      const result = await userCollection.updateOne(
        { email },
        { $set: updatedData }
      );
      res.send(result);
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to update user");
    }
  });

  return router;
};
