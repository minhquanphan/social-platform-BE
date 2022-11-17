// 5. Friend can make a reaction (like, dislike) to each other post ✅
// 6. Friend can make a reaction (like, dislike) to each other comment ✅

const { catchAsync, sendResponse, AppError } = require("../helpers/utils");

const reactionController = {};

reactionController.reactionPosts = catchAsync(async (req, res, next) => {});

reactionController.reactionComments = catchAsync(async (req, res, next) => {});

module.exports = reactionController;
