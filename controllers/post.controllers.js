// 1. Authenticated user can make a post (POST a post)
// 2. Author can update post by post's id
// 3. Author can delete post by post's id
// 4. Friend can see list of friend's post

const bcrypt = require("bcryptjs/dist/bcrypt");

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Post = require("../models/Post");

const postController = {};

module.exports = userController;
