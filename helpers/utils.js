const utilsHelper = {};
const crypto = require("crypto");

// This function controls the way we response to the client
// If we need to change the way to response later on, we only need to handle it here
utilsHelper.sendResponse = (
  res,
  statusCode,
  success,
  data,
  errors,
  message
) => {
  const response = {};
  if (success) response.success = success;
  if (data) response.data = data;
  if (errors) response.errors = errors;
  if (message) response.message = message;
  return res.status(statusCode).json(response); // make sure data transform into JSON object
};

utilsHelper.generateRandomHexString = (len) => {
  return crypto
    .randomBytes(Math.ceil(len / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, len)
    .toUpperCase(); // return required number of characters
};

// Error handling //try-catch eliminate // catch async
utilsHelper.catchAsync = (func) => (req, res, next) =>
  func(req, res, next).catch((err) => next(err));

// utilsHelper.catchAsync = function(fnc) {
//   return (req, res, next) => {
//     return fnc(req, res, next).catch((err) => (next) => err);
//   };
// };

// OOP programming
class AppError extends Error {
  constructor(statusCode, message, errorType) {
    super(message);
    this.statusCode = statusCode;
    this.errorType = errorType;
    // all errors using this class are operational errors.
    this.isOperational = true;
    // create a stack trace for debugging (Error obj, void obj to avoid stack pollution)
    Error.captureStackTrace(this, this.constructor);
  }
}

// new AppError(200, "testing app", "Test!");

utilsHelper.AppError = AppError;
module.exports = utilsHelper;
