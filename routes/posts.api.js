const express = require("express");
const { body, param } = require("express-validator");
const {
  createPost,
  updatePost,
  deletePost,
  allPosts,
  getPostDetails,
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

router.get(
  "/:postId",
  loginRequired,
  validate([param("postId").exists().isString().custom(checkObjectId)]),
  getPostDetails
);

module.exports = router;
