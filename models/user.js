const { Schema, model } = require("mongoose");

const addressSchema = new Schema({
   street: {
      type: String,
   },
   num: {
      type: Number,
   },
});

const userSchema = new Schema(
   {
      name: {
         type: String,
         require: true,
         minLength: 2,
         match: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/g,
      },
      lastName: {
         type: String,
         require: true,
         minLength: 2,
         match: /^[a-zA-Z]+(([',.-][a-zA-Z ])?[a-zA-Z]*)*$/g,
      },
      email: {
         type: String,
         require: true,
         unique: true,
         match: /.+\@.+\..+/,
         lowercase: true,
      },
      password: {
         type: String,
         require: true,
      },
      role: {
         type: String,
         enum: ["user", "admin"],
         default: "user",
      },
      birthday: {
         type: Date,
      },
      nationality: {
         type: Array,
      },
      address: addressSchema,
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
   },
   {
      collection: "users",
      timestamps: true,
   }
);

module.exports = model("User", userSchema);
