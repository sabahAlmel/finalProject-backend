import Post from "../models/post.model.js";

export const create = async (req, res) => {
  if (!req.body.title || !req.body.description) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }
  const newPost = new Post({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const getposts = async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find()
      .populate("subCategoryId")
      .populate("categoryId")
      .populate("userId")
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const deletepost = async (req, res) => {
  if (req.user.role !== "admin" || req.user.id !== req.params.userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to delete this post" });
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    return res.status(200).json({ message: "The post has been deleted" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const updatepost = async (req, res) => {
  if (req.user.role !== "amdin" || req.user.id !== req.params.userId) {
    return res
      .status(403)
      .json({ message: "You are not allowed to update this post" });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const getPostByUserId = async (req, res) => {
  let { userId } = req.params;
  try {
    if (userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You Are not authorized to complete this action" });
    }
    let posts = await Post.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ posts });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};

export const recommendedPosts = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const userIndex = post.nb.indexOf(req.user.id);
    if (userIndex === -1) {
      post.nbOfRecommendation += 1;
      post.people.push(req.user.id);
    } else {
      post.nbOfRecommendation -= 1;
      post.people.splice(userIndex, 1);
    }
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return res.status(statusCode).json({ message: message });
  }
};
