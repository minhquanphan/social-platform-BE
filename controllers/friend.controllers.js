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

const friendController = {};

friendController.makeFriendRequest = catchAsync(async (req, res, next) => {});

module.exports = friendController;
