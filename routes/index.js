const express = require("express");
const router = express.Router();

/* User endpoints. */
const userRouter = require("./users.api");
router.use("/users", userRouter);

/* Post endpoints. */
const postRouter = require("./posts.api");
router.use("/posts", postRouter);
module.exports = router;
