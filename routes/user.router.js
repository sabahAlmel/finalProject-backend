import express from "express";
import {
  updateUser,
  getUsers,
  deleteUser,
  getUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middelwares.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.put("/update/:userId", authenticate, updateUser);
userRouter.delete("/delete/:userId", authenticate, deleteUser);
userRouter.get("/readOne", authenticate, getUser);

export { userRouter };
