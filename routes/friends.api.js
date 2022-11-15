const express = require("express");
const { body, param } = require("express-validator");
const {
  makeFriendRequest,
  allFriends,
  incomingRequests,
  outgoingRequests,
  responseToRequests,
  cancelOwnRequests,
  unfriend,
} = require("../controllers/friend.controllers");

const { loginRequired } = require("../middlewares/authentication");
const {
  validate,
  checkObjectId,
  statusValueCheck,
} = require("../middlewares/validator");
const router = express.Router();

router.post(
  "/requests",
  loginRequired,
  validate([body("to").exists().isString().custom(checkObjectId)]),
  makeFriendRequest
);

router.get("/me/all", loginRequired, allFriends);

router.get("/requests/incoming", loginRequired, incomingRequests);

router.get("/requests/outgoing", loginRequired, outgoingRequests);

router.put(
  "/requests/:receiverId",
  loginRequired,
  validate([
    param("receiverId").exists().isString().custom(checkObjectId),
    body("status").exists().isString().custom(statusValueCheck),
  ]),
  responseToRequests
);

router.delete("/requests/cancel", loginRequired, cancelOwnRequests);

router.delete(
  "/unfriend/:receiverId",
  validate([param("receiverId").exists().isString().custom(checkObjectId)]),
  loginRequired,
  unfriend
);

module.exports = router;
