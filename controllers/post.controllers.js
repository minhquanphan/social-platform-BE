// 1. Authenticated user can make a post (POST a post) ✅
// 2. Author can update post by post's id ✅
// 3. Author can delete post by post's id ✅
// 4. Author can see list of friend's post ✅

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Comment = require("../models/Comment");
const Friend = require("../models/Friendship");
const Post = require("../models/Post");
const Reaction = require("../models/Reaction");

const postController = {};

postController.createPost = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { content } = req.body;
  let post = await Post.create({ author: currentUserId, content });
  return sendResponse(res, 200, true, post, null, "Create post success");
});

postController.updatePost = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { postId } = req.params;
  let post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "No post found", "No post found");
  }
  if (!post.author.equals(currentUserId)) {
    throw new AppError(404, "Unauthorized", "Unauthorized");
  }
  const allows = ["content", "image"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      post[field] = req.body[field];
    }
  });
  await post.save();
  return sendResponse(res, 200, true, post, null, "Post updated");
});

postController.deletePost = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { postId } = req.params;
  let post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "No post found", "No post found");
  }
  if (!post.author.equals(currentUserId)) {
    throw new AppError(404, "Unauthorized", "Unauthorized");
  }
  post.isDeleted = true;
  await post.save();
  return sendResponse(res, 200, true, {}, null, "Post deleted");
});

postController.allPosts = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const friendList = await Friend.find({
    $or: [{ from: currentUserId }, { to: currentUserId }],
    status: "accepted",
  });

  let friendIDs = friendList.map(({ from, to }) => {
    if (from.equals(currentUserId)) {
      return to;
    } else {
      return from;
    }
  });

  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const offset = limit * (page - 1);
  const count = await Post.countDocuments({ isDeleted: false });
  const totalPages = Math.ceil(count / limit);

  let postList = await Post.find({ author: friendIDs, isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");

  return sendResponse(
    res,
    200,
    true,
    { postList, totalPages },
    null,
    "Successful get post list"
  );
});

postController.getPostDetails = catchAsync(async (req, res, next) => {
  const { postId } = req.params;

  const post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "Post not found", "No post found");
  }
  let comments = await Comment.find({
    post: postId,
    isDeleted: false,
  });

  const commentReactions = await Reaction.find({ targetId: comments });

  const postReactions = await Reaction.find({ targetId: postId });

  return sendResponse(
    res,
    200,
    true,
    { comments, postReactions, commentReactions },
    null,
    "Successful"
  );
});

module.exports = postController;
