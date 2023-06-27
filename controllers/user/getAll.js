const { errorMsg } = require("../../_utils/messages");
const { User } = require("../../models");

module.exports = async (req, res) => {
   let { page } = req.query;

   page = +page;
   if (!page || page < 0) page = 1;

   const LIMIT = 1;
   const offset = (page - 1) * LIMIT;

   const userCount = await User.countDocuments();
   const maxPages = Math.ceil(userCount / LIMIT);

   if (page > maxPages) {
      return res.status(404).json({
         status: "Error",
         message: errorMsg.pagination.SURPASS,
      });
   }

   try {
      const users = await User.find(
         {},

         //"name email" // mostrar campos

         // ocultar campos
         { password: 0, createdAt: 0, updatedAt: 0, __v: 0 }
      )
         .populate({
            path: "courses",
            select: "name category -_id",
         })
         .skip(offset)
         .limit(LIMIT);

      res.status(200).json({
         info: {
            count: userCount,
            page,
            pages: maxPages,
         },
         results: users,
      });
   } catch (error) {
      res.status(500).json({
         status: "error",
         message: errorMsg.user.GETALL,
      });
   }
};
