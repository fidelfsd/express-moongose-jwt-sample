const bcrypt = require("bcrypt");
const { generateToken } = require("../../_utils/token");
const { errorMsg, successMsg } = require("../../_utils/messages");

const { User } = require("../../models");

/**
 * Login user
 * Url example: [POST] http://localhost:3000/auth/login
 * @param {*} req Request object
 * @param {*} res Response object
 */
module.exports = async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(400).json({
         status: "Error",
         message: errorMsg.authentication.REQUIERED,
      });
   }

   try {
      const user = await User.findOne({ email: email });

      if (!user) {
         return res.status(400).json({
            status: "Error",
            message: errorMsg.authentication.BADCREDENTIALS,
         });
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
         return res.status(400).json({
            status: "Error",
            message: errorMsg.authentication.BADCREDENTIALS,
         });
      }

      const token = generateToken({
         userId: user._id,
         userName: user.name,
         userRole: user.role,
      });

      res.status(200).json({
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         status: "Error",
         message: errorMsg.authentication.LOGINFAILED,
      });
   }
};
