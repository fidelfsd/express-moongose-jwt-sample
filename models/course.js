const { Schema, model } = require("mongoose");

const courseSchema = new Schema(
   {
      name: {
         type: String,
         require: true,
         minLength: 2,
         match: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/g,
      },

      category: {
         type: String,
         enum: ["backend", "frontend"],
      },

      users: [
         {
            type: Schema.Types.ObjectId,
            ref: "User",
         },
      ],
   },
   {
      timestamps: true,
      collection: "courses",
   }
);

module.exports = model("Course", courseSchema);
