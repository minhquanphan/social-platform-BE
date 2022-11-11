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
    throw new AppError(400, "Invalid email or password", "Login error");
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError(409, "Invalid password", "Wrong password");
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
module.exports = userController;
