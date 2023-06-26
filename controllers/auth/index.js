const authController = {};

authController.register = require("./register");
authController.login = require("./login");

module.exports = authController;
