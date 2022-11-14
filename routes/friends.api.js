const express = require("express");
const { body } = require("express-validator");
const {
  makeFriendRequest,
  allFriends,
} = require("../controllers/friend.controllers");

const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/requests",
  loginRequired,
  validate([body("to").exists().isString().custom(checkObjectId)]),
  makeFriendRequest
);

router.get("/all", loginRequired, allFriends);

module.exports = router;
