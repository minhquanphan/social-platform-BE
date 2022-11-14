// 1. User can create account with email and password ✅
// 2. User can login with email and password ✅
// 3. User can see a list of all users ✅
// 4. User can see other user's information by id ✅
// 5. Owner can see own user's information ✅
// 6. Owner can update own account profile ✅
// 7. Owner can deactivate own account ✅
// 8. Rocket Search user by name ✅

const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/User");
const { catchAsync, sendResponse, AppError } = require("../helpers/utils");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  let { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw new AppError(409, "User already exists", "Register Error");
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    name,
    email,
    password,
  });

  const accessToken = user.generateToken();

  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});

userController.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "+password");
  if (!user) {
    throw new AppError(400, "User not found", "Login error");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(400, "Invalid password", "Wrong password");
  }
  const accessToken = user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Login successful"
  );
});

userController.getAll = catchAsync(async (req, res, next) => {
  let { page, limit, ...filter } = { ...req.query };
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  // search user by name, email
  const filterCondition = [{ isDeleted: false }];
  const allows = ["name", "email"];
  allows.forEach((field) => {
    if (filter[field] !== undefined) {
      filterCondition.push({ [field]: filter[field] });
    }
  });
  const filterCritera = filterCondition.length ? { $and: filterCondition } : {};

  const count = await User.countDocuments(filterCritera);
  const totalPage = Math.ceil(count / limit);
  const offset = limit * (page - 1);
  let userList = await User.find(filterCritera)
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit);
  return sendResponse(
    res,
    200,
    true,
    { userList, totalPage },
    null,
    "successful"
  );
});

userController.getSingleUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(404, "User Not Found", "Get current user error");
  }
  return sendResponse(res, 200, true, user, null, "Success");
});

userController.getCurrentUserProfile = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  const currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    throw new AppError(404, "User not found", "Error");
  }
  return sendResponse(res, 200, true, currentUser, null, "Success");
});

userController.updateCurrentUserProfile = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let currentUser = await User.findById(currentUserId);
  if (!currentUser) {
    throw new AppError(404, "User not found", "Error");
  }
  const allows = ["name", "about me"];
  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      currentUser[field] = req.body[field];
    }
  });
  await currentUser.save();
  return sendResponse(res, 200, true, currentUser, null, "Success");
});

userController.deactivate = catchAsync(async (req, res, next) => {
  const { currentUserId } = req;
  let currentUser = await User.findByIdAndUpdate(
    currentUserId,
    { isDeleted: true },
    { new: true }
  );
  if (!currentUser) {
    throw new AppError(404, "User not found", "Error");
  }
  return sendResponse(res, 200, true, {}, null, "Success");
});

module.exports = userController;
