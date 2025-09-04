const mongoose = require("mongoose");

const adminShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "nurse", "staff"],
      default: "staff",
    },
    profile: {
      type: String,
      required: true,
    },
    fees: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Admin", adminShema);
