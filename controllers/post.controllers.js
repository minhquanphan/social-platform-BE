// 1. Authenticated user can make a post (POST a post) ✅
// 2. Author can update post by post's id ✅
// 3. Author can delete post by post's id ✅
// 4. Friend can see list of friend's post

const bcrypt = require("bcryptjs/dist/bcrypt");

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Post = require("../models/Post");

const postController = {};

postController.createPost = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { content, image } = req.body;
  let post = await Post.create({ author: currentUserId, content, image });
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

module.exports = postController;
