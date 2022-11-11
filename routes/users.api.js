const express = require("express");
const { register, login } = require("../controllers/user.controllers");

const router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
module.exports = router;
