const express = require("express");
const { body } = require("express-validator");
const {
  makeFriendRequest,
  allFriends,
  incomingRequests,
  outgoingRequests,
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
router.get("/requests/incoming", loginRequired, incomingRequests);
router.get("/requests/outgoing", loginRequired, outgoingRequests);

module.exports = router;
