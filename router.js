const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");

// home page
router.use("/", indexRouter);

// users
router.use("/api/users", usersRouter);

// authentication
router.use("/auth", authRouter);

module.exports = router;
