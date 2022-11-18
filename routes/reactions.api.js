const express = require("express");
const { body, param } = require("express-validator");
const {
  createReactions,
  getAllReactions,
} = require("../controllers/reaction.controllers");

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

router.get(
  "/all",
  loginRequired,
  validate([
    body("targetId").exists().isString().custom(checkObjectId),
    body("targetType").exists().isString(),
  ]),
  getAllReactions
);

module.exports = router;
