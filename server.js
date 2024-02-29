import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
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

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("comment", (data) => {
    if (!data.user) {
      io.emit("delete-comment", data.comments);
    } else {
      io.emit("new-comment", data.comments);
      io.emit("notification", {
        user: data.user,
        message: "commented on your article",
      });
    }
  });
});

async function startServer() {
  mongoose.connection.once("open", () => {
    console.log("mongo is ready");
  });

  mongoose.connection.on("error", (err) => {
    console.error(err);
  });
  await mongoose.connect(process.env.MONGO_URI);

  server.listen(process.env.PORT, "0.0.0.0", () => {
    console.log("listening on port: " + process.env.PORT);
  });
}

startServer();
