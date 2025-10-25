import express from "express";
import foodsRoute from "./foods.js";
import usersRoute from "./users.js";
import likeRoute from "./like.js";
import commentRoute from "./comment.js";
import donationsRoute from "./donations.js";

export default (connectDB) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("🚀 Welcome to the Share Bite API!");
  });

  router.use("/foods", foodsRoute(connectDB));
  router.use("/users", usersRoute(connectDB));
  router.use("/like", likeRoute(connectDB));
  router.use("/comment", commentRoute(connectDB));
  router.use("/donations", donationsRoute(connectDB));

  return router;
};
