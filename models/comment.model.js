import mongoose from "mongoose";
const CommmentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      autopopulate: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      autopopulate: true,
    },
  },
  { timestamps: true }
);

// CommmentSchema.pre("save", function () {
//   this.populate(["userId", "postId"]);
// });

const Comment = mongoose.model("Comment", CommmentSchema);

export default Comment;
