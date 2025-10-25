import express from "express";
import { ObjectId } from "mongodb";

export default (connectDB) => {
  const router = express.Router();

  // ✅ Like / Unlike Food
  router.put("/", async (req, res) => {
    try {
      const { id, email } = req.body;

      if (!id || !email) {
        return res
          .status(400)
          .json({ message: "Both food ID and user email are required" });
      }

      const db = await connectDB();
      const foods = db.collection("foods");

      const food = await foods.findOne({ _id: new ObjectId(id) });
      if (!food) return res.status(404).json({ message: "Food not found" });

      const alreadyLiked =
        Array.isArray(food.likedBy) && food.likedBy.includes(email);

      const updateQuery = alreadyLiked
        ? { $pull: { likedBy: email } } // Unlike
        : { $addToSet: { likedBy: email } }; // Like

      const result = await foods.findOneAndUpdate(
        { _id: new ObjectId(id) },
        updateQuery,
        { returnDocument: "after" }
      );

      res.json({
        success: true,
        liked: !alreadyLiked,
        updatedFood: result.value,
      });
    } catch (err) {
      console.error("❌ Like toggle failed:", err);
      res
        .status(500)
        .json({ message: "Failed to toggle like", error: err.message });
    }
  });

  // ✅ Optional: Get all liked foods for a user
  router.get("/", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "Email is required" });

      const db = await connectDB();
      const likedFoods = await db
        .collection("foods")
        .find({ likedBy: email })
        .toArray();

      res.json(likedFoods);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to fetch liked foods", error: err.message });
    }
  });

  return router;
};
