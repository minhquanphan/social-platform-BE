const { catchAsync, sendResponse, AppError } = require("../helpers/utils");

const commentController = {};

commentController.makeComments = catchAsync(async (req, res, next) => {});

module.exports = commentController;
