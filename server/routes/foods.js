import { Router } from "express";
import { ObjectId } from "mongodb";

export default (connectDB) => {
  const router = Router();

  // GET all foods
  router.get("/", async (req, res) => {
    try {
      const db = await connectDB();
      const foods = await db.collection("foods").find({}).toArray();
      res.json(foods);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch foods" });
    }
  });

  // GET single food by ID
  router.get("/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const food = await db.collection("foods").findOne({
        _id: new ObjectId(req.params.id),
      });
      res.json(food || {});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch food" });
    }
  });

  // ADD new food
  router.post("/add-food", async (req, res) => {
    try {
      const db = await connectDB();
      const result = await db.collection("foods").insertOne(req.body);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add food" });
    }
  });

  // UPDATE food by ID
  router.patch("/update-food/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const result = await db.collection("foods").updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to update food" });
    }
  });

  // DELETE food by ID
  router.delete("/delete-food/:id", async (req, res) => {
    try {
      const db = await connectDB();
      const result = await db.collection("foods").deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete food" });
    }
  });

  return router;
};
