const express = require("express");
const router = express.Router();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const coursesRouter = require("./routes/courses");

// home page
router.use("/", indexRouter);

// authentication
router.use("/auth", authRouter);

// users
router.use("/api/users", usersRouter);

// courses
router.use("/api/courses", coursesRouter);

module.exports = router;
