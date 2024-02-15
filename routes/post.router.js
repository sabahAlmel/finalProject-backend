import express from "express";
import {
  create,
  deletepost,
  getposts,
  getPostByUserId,
  updatepost,
  recommendedPosts,
} from "../controllers/post.controller.js";
import { authenticate } from "../middlewares/auth.middelwares.js";

const postRouter = express.Router();

postRouter.get("/getByUser/:userId", authenticate, getPostByUserId);
postRouter.put("/recommended/postId", authenticate, recommendedPosts);
postRouter.post("/create", authenticate, create);
postRouter.get("/getall", getposts);
postRouter.delete("/deletepost/:postId", authenticate, deletepost);
postRouter.put("/updatepost/:postId", authenticate, updatepost);

export default postRouter;
