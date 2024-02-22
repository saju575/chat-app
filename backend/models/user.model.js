const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the User model
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  customer_support_id: {
    type: Schema.Types.ObjectId,
    ref: "CustomerSupport",
  },
  is_customer_support_assign: {
    type: Boolean,
    default: false,
  },
  conversation_id: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
});

// Create the Mongoose model for the User schema
const User = mongoose.model("User", userSchema);

module.exports = User;
