import Comment from "../models/comment.model.js";

export const createComment = async (req, res) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "you are not allowed to create this comment" });
    }

    const newComment = new Comment({
      content,
      postId,
      userId,
    });
    await newComment.save();

    return res.status(200).json(newComment);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("postId")
      .sort({
        createdAt: -1,
      });
    return res.status(200).json(comments);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const userIndex = comment.likes.indexOf(req.user.id);
    if (userIndex === -1) {
      comment.numberOfLikes += 1;
      comment.likes.push(req.user.id);
    } else {
      comment.numberOfLikes -= 1;
      comment.likes.splice(userIndex, 1);
    }
    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const editComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to edit this comment" });
    }

    const editedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        content: req.body.content,
      },
      { new: true }
    );
    return res.status(200).json(editedComment);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.userId != req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this comment" });
    }
    await Comment.findByIdAndDelete(req.params.commentId);
    return res.status(200).json("Comment has been deleted");
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const getcomments = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const comments = await Comment.find()
      .populate("postId")
      .populate("userId")
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    return res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};
