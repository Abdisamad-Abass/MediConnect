const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: [true, "Please Enter a username"],
    },
    email: {
      type: String,
      require: [true, "Please Enter an email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      require: [true, "Please Enter a password"],
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("User", userSchema);
