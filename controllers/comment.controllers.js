// 1. Friend can make a comment (POST a comment) to other friend's post
// 2. Friend can see a list of all comment belong to friend's post (Post api)
// 3. Author of Comment can update that comment
// 4. Author of Comment can delete that comment

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const commentController = {};

commentController.createNewComments = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { postId, content, image } = req.body;
  const post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "Post not found", "Comment error");
  }
  let comment = await Comment.create({
    author: currentUserId,
    post: postId,
    content: content,
    image: image,
  });
  return sendResponse(res, 200, true, comment, null, "Comment success");
});

commentController.updateComment = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { commentId } = req.params;
  let comments = await Comment.findOne({ _id: commentId, isDeleted: false });
  if (!comments) {
    throw new AppError(404, "No comment found", "Comment error");
  }
  if (!comments.author.equals(currentUserId)) {
    throw new AppError(404, "Unauthorized", "Unauthorized");
  }
  const allows = ["content", "image"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      comments[field] = req.body[field];
    }
  });
  await comments.save();
  return sendResponse(res, 200, true, comments, null, "Comment updated");
});

commentController.deleteComment = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { commentId } = req.params;
  let comments = await Comment.findByIdAndDelete({
    _id: commentId,
    isDeleted: false,
  });
  if (!comments) {
    throw new AppError(404, "No comment found", "Comment error");
  }
  if (!comments.author.equals(currentUserId)) {
    throw new AppError(404, "Unauthorized", "Unauthorized");
  }
  return sendResponse(res, 200, true, {}, null, "Deleted success");
});

commentController.getAllCommentsByPost = catchAsync(async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "Post not found", "Error request");
  }
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 15;
  const count = await Comment.countDocuments({ isDeleted: false });
  const offset = limit * (page - 1);
  const totalPages = Math.ceil(count / limit);
  let comments = await Comment.find({ post: postId, isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");
  return sendResponse(
    res,
    200,
    true,
    { comments, totalPages },
    null,
    "Success"
  );
});

module.exports = commentController;
