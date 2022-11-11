const express = require("express");
const { createPost } = require("../controllers/post.controllers");

const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", loginRequired, createPost);

module.exports = router;

createPost;
