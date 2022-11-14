const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controllers");

const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", loginRequired, createPost);
router.put("/:postId", loginRequired, updatePost);
router.delete("/:postId", loginRequired, deletePost);

module.exports = router;
