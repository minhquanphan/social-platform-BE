const express = require("express");
const { register } = require("../controllers/user.controllers");

const router = express.Router();

/* GET users listing. */
router.post("/register", register);
module.exports = router;
