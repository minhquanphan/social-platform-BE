const express = require("express");
const { body, param } = require("express-validator");
const {
  createPost,
  updatePost,
  deletePost,
  allPosts,
} = require("../controllers/post.controllers");

const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create",
  loginRequired,
  validate([body("content").exists().isString()]),
  createPost
);
router.put(
  "/:postId",
  loginRequired,
  validate([param("postId").exists().isString().custom(checkObjectId)]),
  updatePost
);
router.delete(
  "/:postId",
  loginRequired,
  validate([param("postId").exists().isString().custom(checkObjectId)]),
  deletePost
);
router.get("/timeline", loginRequired, allPosts);

module.exports = router;
