// 1. Authenticated user can make friend request to other
// 2. Authenticated user can see list of friend
// 3. Authenticated user can accept or reject a friend request
// 4. Authenticated user can see a list of all request receive
// 5. Author can see a list of all request sent
// 6. Author of Request can cancel the request
// 7. Friend can unfriend

const bcrypt = require("bcryptjs/dist/bcrypt");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Friend = require("../models/Friendship");
const User = require("../models/User");

const friendController = {};

friendController.makeFriendRequest = catchAsync(async (req, res, next) => {
  const requestorId = req.currentUserId;
  const receiverId = req.body.to;

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    throw new AppError(404, "User not found", "Make friend request error");
  }

  let friendship = await Friend.findOne({
    $or: [
      { from: requestorId, to: receiverId },
      { from: receiverId, to: requestorId },
    ],
  });

  if (!friendship) {
    friendship = await Friend.create({
      from: requestorId,
      to: receiverId,
      status: "pending",
    });
  } else if (friendship.status === "declined") {
    friendship.from = requestorId;
    friendship.to = receiverId;
    friendship.status = "pending";
    await friendship.save();
  } else {
    throw new AppError(
      400,
      "Friend request already sent",
      "Make friend request error"
    );
  }
  return sendResponse(
    res,
    200,
    true,
    friendship,
    null,
    "Make friend request successful"
  );
});

friendController.allFriends = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const friendList = await Friend.find({
    $or: [{ from: currentUserId }, { to: currentUserId }],
    status: "accepted",
  });

  let friendIDs = friendList.map(({ from, to }) => {
    if (from.equals(currentUserId)) {
      return to;
    } else {
      return from;
    }
  });

  const filterCondition = [{ _id: { $in: friendIDs } }];
  if (filter.name !== undefined) {
    filterCondition.push({ ["name"]: { $regex: filter.name, $options: "i" } });
  }
  const filterCritera = filterCondition.length ? { $and: filterCondition } : {};
  const offset = limit * (page - 1);
  const count = await User.countDocuments(filterCritera);
  const totalPages = Math.ceil(count / limit);
  let users = await User.find(filterCritera)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages },
    null,
    "Successful"
  );
});

friendController.incomingRequests = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const friendList = await Friend.find({
    to: currentUserId,
    status: "pending",
  });

  let requestorId = friendList.map(({ from }) => from);

  const filterCondition = [{ _id: { $in: requestorId } }];
  if (filter.name !== undefined) {
    filterCondition.push({ ["name"]: { $regex: filter.name, $options: "i" } });
  }
  const filterCritera = filterCondition.length ? { $and: filterCondition } : {};
  const offset = limit * (page - 1);
  const count = await User.countDocuments(filterCritera);
  const totalPages = Math.ceil(count / limit);
  let users = await User.find(filterCritera)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages },
    null,
    "Successful"
  );
});

friendController.outgoingRequests = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 20;
  const friendList = await Friend.find({
    from: currentUserId,
    status: "pending",
  });

  let receiverId = friendList.map(({ to }) => to);

  const filterCondition = [{ _id: { $in: receiverId } }];
  if (filter.name !== undefined) {
    filterCondition.push({ ["name"]: { $regex: filter.name, $options: "i" } });
  }
  const filterCritera = filterCondition.length ? { $and: filterCondition } : {};
  const offset = limit * (page - 1);
  const count = await User.countDocuments(filterCritera);
  const totalPages = Math.ceil(count / limit);
  let users = await User.find(filterCritera)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);

  return sendResponse(
    res,
    200,
    true,
    { users, totalPages },
    null,
    "Successful"
  );
});

friendController.responseToRequests = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { status } = req.body;
  const { receiverId } = req.params;

  let friendShip = await Friend.findOne({
    to: currentUserId,
    from: receiverId,
    status: "pending",
  });

  if (!friendShip) {
    throw new AppError(400, "Friend request not found", "Respone to requests");
  }
  friendShip.status = status;
  friendShip = await friendShip.save();
  return sendResponse(res, 200, true, friendShip, null, "Success");
});

friendController.cancelOwnRequests = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { receiverId } = req.body;

  let friendShip = await Friend.findOneAndDelete({
    from: currentUserId,
    to: receiverId,
    status: "pending",
  });

  if (!friendShip) {
    throw new AppError(400, "Friend request not found", "Cancel error");
  }
  return sendResponse(res, 200, true, {}, null, "Success");
});

friendController.unfriend = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { receiverId } = req.params;

  let friendShip = await Friend.findOneAndDelete({
    $or: [
      { from: currentUserId, to: receiverId, status: "accepted" },
      { to: currentUserId, from: receiverId, status: "accepted" },
    ],
  });

  if (!friendShip) {
    throw new AppError(400, "Friend request not found", "Unfriend error");
  }
  return sendResponse(res, 200, true, {}, null, "Success");
});

module.exports = friendController;
