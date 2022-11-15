const express = require("express");
const { body } = require("express-validator");
const { createNewComments } = require("../controllers/comment.controllers");
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

module.exports = router;
