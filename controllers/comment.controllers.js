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
  const { postId, content } = req.body;
  const post = await Post.findOne({ _id: postId, isDeleted: false });
  if (!post) {
    throw new AppError(404, "Post not found", "Comment error");
  }
  let comment = await Comment.create({
    author: currentUserId,
    post: postId,
    content: content,
  });
  return sendResponse(res, 200, true, comment, null, "Comment success");
});

module.exports = commentController;
