const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    creatorId: {
      id: mongoose.Types.ObjectId,
      ref: "User",
    },

    participantId: {
      id: mongoose.Types.ObjectId,
      ref: "CustomerSupport",
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
