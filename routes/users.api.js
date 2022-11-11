const express = require("express");
const {
  register,
  login,
  getAll,
  getSingleUserById,
} = require("../controllers/user.controllers");

const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
router.get("/all", getAll);
router.get("/:id", getSingleUserById);
module.exports = router;
