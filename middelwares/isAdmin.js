module.exports = (req, res, next) => {
   const userRole = req.userRole;

   if (userRole == "admin") {
      next();
   } else {
      res.status(403).json({
         status: "Error",
         message: `Don't have permission`,
      });
   }
};
