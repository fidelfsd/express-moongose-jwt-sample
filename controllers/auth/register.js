const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { successMsg, errorMsg } = require("../../_utils/messages");

/**
 * Create new user
 * Url example: [POST] http://localhost:3000/auth/register
 * @param {*} req Request object
 * @param {*} res Response object
 */
module.exports = async (req, res) => {
   const { name, lastName, email, password } = req.body;

   if (password.lenght < 8) {
      return res.status(400).json({
         status: "Error",
         message: errorMsg.user.PASSWORDLEN,
      });
   }

   try {
      const hash = bcrypt.hashSync(password, 10);

      const newUser = {
         name,
         lastName,
         email,
         password: hash,
      };

      await User.create(newUser);

      res.status(201).json({
         message: successMsg.user.CREATE,
      });
   } catch (error) {
      console.log(error.name);
      console.log(error.message);

      const code = error.name == "ValidationError" ? 400 : 500;

      res.status(code).json({
         status: "Error",
         message: code == 400 ? error.message : errorMsg.user.CREATE,
      });
   }
};
