const express = require("express");
const { body, param } = require("express-validator");
const {
  createNewComments,
  updateComment,
  deleteComment,
  getAllCommentsByPost,
} = require("../controllers/comment.controllers");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create",
  loginRequired,
  validate([
    body("postId").exists().isString().custom(checkObjectId),
    body("content").exists().isString(),
  ]),
  createNewComments
);

router.put(
  "/:commentId",
  loginRequired,
  validate([
    param("commentId").exists().isString().custom(checkObjectId),
    body("content").exists().isString(),
  ]),
  updateComment
);

router.delete(
  "/:commentId",
  loginRequired,
  validate([param("commentId").exists().isString().custom(checkObjectId)]),
  deleteComment
);

router.get(
  "/:postId",
  loginRequired,
  validate([param("postId").exists().isString().custom(checkObjectId)]),
  getAllCommentsByPost
);
module.exports = router;
