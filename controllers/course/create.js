const { errorMsg, successMsg } = require("../../_utils/messages");
const { Course } = require("../../models");

module.exports = async (req, res) => {
   const { name, category } = req.body;

   const newCourse = {
      name,
      category,
   };

   try {
      await Course.create(newCourse);
      res.status(201).json({
         message: successMsg.course.CREATE,
      });
   } catch (error) {
      res.status(500).json({
         status: "Error",
         message: errorMsg.course.CREATE,
      });
   }
};
