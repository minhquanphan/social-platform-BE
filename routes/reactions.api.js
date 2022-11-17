const express = require("express");
const { body } = require("express-validator");
const { createReactions } = require("../controllers/reaction.controllers");

const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/create",
  loginRequired,
  validate([
    body("targetId").exists().isString().custom(checkObjectId),
    body("targetType").exists().isString(),
  ]),
  createReactions
);

module.exports = router;
