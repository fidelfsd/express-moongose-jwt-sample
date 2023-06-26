const errorMsg = {
   user: {
      CREATE: "Error creating user",
      UPDATE: "Error updating user",
      DELETE: "Error deleting user",
      GETALL: "Error retreiving all users",
      GETONE: "Error retreiving user",
      NOTFOUND: "User not found",
      PASSWORDLEN: "Password length can not be less than 8",
   },

   pagination: {
      SURPASS: "There is nothing here",
   },

   token: {
      NOTFOUND: "No authorization token was found",
      INVALID: "Invalid token",
   },

   authentication: {
      NOAUTH: "Dont have permission",
      BADCREDENTIALS: "These credentials do not match our records",
      REQUIERED: "Email and Password are required",
      LOGINFAILED: "User login failed",
   },
};

const successMsg = {
   user: {
      CREATE: "User created succsessfully",
      UPDATE: "User updated succsessfully",
      DELETE: "User deleted succsessfully",
   },
};

module.exports = {
   successMsg,
   errorMsg,
};
