const express = require("express");
const {
  register,
  login,
  getAll,
  getSingleUserById,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deactivate,
} = require("../controllers/user.controllers");
const { loginRequired } = require("../middlewares/authentication");

const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
router.get("/all", getAll);
router.get("/:id", getSingleUserById);
router.get("/me/get", loginRequired, getCurrentUserProfile);
router.put("/me/update", loginRequired, updateCurrentUserProfile);
router.delete("/me/deactive", loginRequired, deactivate);
module.exports = router;
