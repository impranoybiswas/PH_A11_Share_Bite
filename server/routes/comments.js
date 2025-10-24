import { Router } from "express";
import { ObjectId } from "mongodb";

export default (connectDB) => {
  const router = Router();

  // Add comment
  router.post("/", async (req, res) => {
    try {
      const db = await connectDB();
      const foodCollection = db.collection("foods");

      const { id, email, commentText } = req.body;
      if (!id || !email || !commentText) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const comment = {
        _id: new ObjectId(),
        author: email,
        comment: commentText,
        date: new Date(),
      };

      const result = await foodCollection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $push: { comments: { $each: [comment], $position: 0 } } },
        { returnDocument: "after" }
      );

      if (!result.value) return res.status(404).json({ message: "Food not found" });

      res.json({ success: true, updatedItem: result.value, addedComment: comment });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to add comment" });
    }
  });

  // Edit comment
  router.put("/:foodId/:commentId", async (req, res) => {
    try {
      const db = await connectDB();
      const foodCollection = db.collection("foods");
      const { foodId, commentId } = req.params;
      const { email, newComment } = req.body;

      if (!email || !newComment) return res.status(400).json({ message: "Missing fields" });

      const filter = {
        _id: new ObjectId(foodId),
        "comments._id": new ObjectId(commentId),
        "comments.author": email,
      };

      const update = { $set: { "comments.$.comment": newComment, "comments.$.date": new Date() } };

      const result = await foodCollection.findOneAndUpdate(filter, update, { returnDocument: "after" });

      if (!result.value) return res.status(403).json({ message: "Not allowed or comment not found" });

      res.json({ success: true, updatedItem: result.value });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to edit comment" });
    }
  });

  // Delete comment
  router.delete("/:foodId/:commentId", async (req, res) => {
    try {
      const db = await connectDB();
      const foodCollection = db.collection("foods");
      const { foodId, commentId } = req.params;
      const { email } = req.body;

      if (!email) return res.status(400).json({ message: "Email required" });

      const food = await foodCollection.findOne({ _id: new ObjectId(foodId) });
      if (!food) return res.status(404).json({ message: "Food not found" });

      const comment = (food.comments || []).find((c) => c._id.toString() === commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });
      if (comment.author !== email) return res.status(403).json({ message: "Not allowed" });

      const result = await foodCollection.findOneAndUpdate(
        { _id: new ObjectId(foodId) },
        { $pull: { comments: { _id: new ObjectId(commentId) } } },
        { returnDocument: "after" }
      );

      res.json({ success: true, updatedItem: result.value });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete comment" });
    }
  });

  // Like toggle
  router.put("/:id/like", async (req, res) => {
    try {
      const db = await connectDB();
      const foodCollection = db.collection("foods");
      const { id } = req.params;
      const { email } = req.body;

      if (!email) return res.status(400).json({ message: "Email required" });

      const food = await foodCollection.findOne({ _id: new ObjectId(id) });
      if (!food) return res.status(404).json({ message: "Food not found" });

      const alreadyLiked = Array.isArray(food.likedBy) && food.likedBy.includes(email);

      const result = alreadyLiked
        ? await foodCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $pull: { likedBy: email } },
            { returnDocument: "after" }
          )
        : await foodCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $addToSet: { likedBy: email } },
            { returnDocument: "after" }
          );

      res.json({ success: true, updatedItem: result.value, liked: !alreadyLiked });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to toggle like" });
    }
  });

  return router;
};
