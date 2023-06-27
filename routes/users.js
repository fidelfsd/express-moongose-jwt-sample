const express = require("express");
const userController = require("../controllers/user");
const verifyToken = require("../middelwares/verifyToken");
const isAdmin = require("../middelwares/isAdmin");
const router = express.Router();

// GET users listing
router.get("/", verifyToken, isAdmin, userController.getAll);

// add course
router.put("/:userId/course", verifyToken, isAdmin, userController.addCourse);

module.exports = router;
