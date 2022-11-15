const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  allPosts,
} = require("../controllers/post.controllers");

const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", loginRequired, createPost);
router.put("/:postId", loginRequired, updatePost);
router.delete("/:postId", loginRequired, deletePost);
router.get("/me/all", loginRequired, allPosts);

module.exports = router;
