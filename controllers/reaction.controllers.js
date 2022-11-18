// 5. Friend can make a reaction (like, dislike) to each other post ✅
// 6. Friend can make a reaction (like, dislike) to each other comment ✅

const mongoose = require("mongoose");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");
const Post = require("../models/Post");
const Reaction = require("../models/Reaction");

const reactionController = {};

reactionController.createReactions = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const { targetType, targetId, emoj } = req.body;
  const collectionName = mongoose.model(targetType);
  let target = await collectionName.findOne({ _id: targetId });
  if (!target) {
    throw new AppError("404", "Target not found", "Create reactions error");
  }

  let reaction = await Reaction.findOne({
    targetType,
    targetId,
    author: currentUserId,
  });

  let message = "";
  if (!reaction) {
    await Reaction.create({
      targetType,
      targetId,
      author: currentUserId,
      emoj,
    });
  } else if (reaction.emoj === emoj) {
    await reaction.delete();
    message = "delete reaction";
  } else {
    reaction.emoj = emoj;
    await reaction.save();
    message = "change reaction emoji";
  }

  const reactions = await Reaction.find({ targetType, targetId });

  sendResponse(res, 200, true, reactions, null, message);
});

reactionController.getAllReactions = catchAsync(async (req, res, next) => {
  const { targetType, targetId } = req.body;
  const collectionName = mongoose.model(targetType);
  const target = await collectionName.findOne({ _id: targetId });
  if (!target) {
    throw new AppError("404", "Target not found", "Error");
  }
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 15;
  const count = await Reaction.countDocuments({ isDeleted: false });
  const offset = limit * (page - 1);
  const totalPages = Math.ceil(count / limit);
  let reactions = await Reaction.find({ targetId, targetType })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .populate("author");

  return sendResponse(
    res,
    200,
    true,
    { reactions, totalPages },
    null,
    "Success"
  );
});

module.exports = reactionController;
