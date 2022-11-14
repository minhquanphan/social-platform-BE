const express = require("express");

const { loginRequired } = require("../middlewares/authentication");
const router = express.Router();

module.exports = router;
