const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    senderType: {
      type: String,
      enum: ["User", "CustomerSupport"],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderType",
    },
    reciverType: {
      type: String,
      enum: ["User", "CustomerSupport"],
    },
    reciverId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "reciverType",
    },
    message: {
      type: String,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
