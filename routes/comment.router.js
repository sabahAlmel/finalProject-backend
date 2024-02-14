import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();
import { authenticate } from "../middlewares/auth.middelwares.js";

commentRouter.post("/create", authenticate, createComment);
commentRouter.get("/getPostComments/:postId", getPostComments);
commentRouter.put("/likeComment/:commentId", authenticate, likeComment);
commentRouter.put("/editComment/:commentId", authenticate, editComment);
commentRouter.delete("/deleteComment/:commentId", authenticate, deleteComment);
commentRouter.get("/getcomments", getcomments);

export default commentRouter;
