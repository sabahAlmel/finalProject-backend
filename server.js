import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.router.js";
import { authRouter } from "./routes/auth.router.js";
import postRouter from "./routes/post.router.js";
import commentRouter from "./routes/comment.router.js";
import { subCategoryRouter } from "./routes/subCategory.router.js";
import { categoryRouter } from "./routes/category.router.js";

dotenv.config();

// express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);

async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(process.env.PORT, () => {
    console.log("listening on port: " + process.env.PORT);
  });
}

startServer();
