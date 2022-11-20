const express = require("express");
const { param, body, header } = require("express-validator");
const {
  register,
  login,
  getAll,
  getSingleUserById,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deactivate,
  changePassword,
} = require("../controllers/user.controllers");
const { loginRequired } = require("../middlewares/authentication");
const { validate, checkObjectId } = require("../middlewares/validator");

const router = express.Router();

/* GET users listing. */
router.post(
  "/register",
  validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  register
);
router.post(
  "/login",
  validate([
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  login
);
router.get("/all", getAll);
router.get(
  "/:id",
  validate([param("id").exists().isString().custom(checkObjectId)]),
  getSingleUserById
);
router.get(
  "/me/get",
  validate([header("authorization").exists().isString()]),
  loginRequired,
  getCurrentUserProfile
);
router.put("/me/update", loginRequired, updateCurrentUserProfile);
router.delete("/me/deactive", loginRequired, deactivate);
router.put("/changePassword", loginRequired, changePassword);
module.exports = router;
