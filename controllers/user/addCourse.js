const { errorMsg, successMsg } = require("../../_utils/messages");
const { User, Course } = require("../../models");
const { Types } = require("mongoose");

module.exports = async (req, res) => {
   const { userId } = req.params;
   const { courseId } = req.body;

   console.log(userId);

   try {
      const isValidUserId = Types.ObjectId.isValid(userId);

      if (!isValidUserId) {
         return res.status(400).json({
            status: "Error",
            message: errorMsg.user.NOTVALID_ID,
         });
      }

      const isValidCourseId = Types.ObjectId.isValid(courseId);

      if (!isValidCourseId) {
         return res.status(400).json({
            status: "Error",
            message: errorMsg.course.NOTVALID_ID,
         });
      }

      const course = await Course.findById(courseId);

      if (!course) {
         return res.status(404).json({
            status: "Error",
            message: errorMsg.course.NOTFOUND,
         });
      }

      const isCourseAssigned = await User.findOne({
         _id: userId,
         courses: courseId,
      });

      if (isCourseAssigned) {
         return res.status(400).json({
            status: "Error",
            message: errorMsg.course.ASSIGNED,
         });
      }

      const user = await User.findByIdAndUpdate(userId, {
         $push: { courses: courseId },
      });

      if (!user) {
         return res.status(404).json({
            status: "Error",
            message: errorMsg.user.NOTFOUND,
         });
      }

      course.users.push(userId);
      await course.save();

      res.status(202).json({
         message: successMsg.user.UPDATE,
      });
   } catch (error) {
      res.status(500).json({
         status: "error",
         message: errorMsg.user.UPDATE,
         error,
      });
   }
};
