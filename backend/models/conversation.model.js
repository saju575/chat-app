const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerSupport",
    },
    last_updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add a pre-save hook to populate the creatorId and participantId fields
conversationSchema.pre("save", async function (next) {
  try {
    // Access the model using the model() method
    const User = mongoose.model("User");
    const CustomerSupport = mongoose.model("CustomerSupport");

    // Populate the creatorId field with data from the User collection
    this.creatorId = await User.findById(this.creatorId);

    // Populate the participantId field with data from the CustomerSupport collection
    this.participantId = await CustomerSupport.findById(this.participantId);

    next();
  } catch (error) {
    next(error);
  }
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
