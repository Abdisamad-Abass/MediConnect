const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
     direction: {
      type: String,
      enum: ["user-to-admin", "admin-to-user"],
      required: true,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.models.Message || mongoose.model("Message", messageSchema);