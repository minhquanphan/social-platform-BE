const express = require("express");
const {
  register,
  login,
  getAll,
  getSingleUserById,
  getCurrentUserProfile,
} = require("../controllers/user.controllers");
const { loginRequired } = require("../middlewares/authentication");

const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
router.get("/all", getAll);
router.get("/:id", getSingleUserById);
router.get("/me/get", loginRequired, getCurrentUserProfile);
module.exports = router;
