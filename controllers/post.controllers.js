// 1. Authenticated user can make a post (POST a post)
// 2. Author can update post by post's id
// 3. Author can delete post by post's id
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

module.exports = postController;
