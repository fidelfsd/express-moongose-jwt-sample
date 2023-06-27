const express = require("express");
const courseController = require("../controllers/course");
const verifyToken = require("../middelwares/verifyToken");
const isAdmin = require("../middelwares/isAdmin");
const router = express.Router();

// (admin) create course
router.post("/create", verifyToken, isAdmin, courseController.create);

module.exports = router;
