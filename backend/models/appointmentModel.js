const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    doctorName: { type: String, required: true },
    //userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
