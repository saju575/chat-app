const createHttpError = require("http-errors");
const Message = require("../../models/message.model");
const { successResponse } = require("../response/response.controller");

exports.createNewMessage = async (req, res, next) => {
  try {
    const {
      senderType,
      senderId,
      receiverType,
      receiverId,
      message,
      conversationId,
    } = req.body;

    if (
      !senderType ||
      !senderId ||
      !receiverType ||
      !receiverId ||
      !message ||
      !conversationId
    ) {
      throw createHttpError(400, "Missing required fields");
    }

    // Create a new message
    const newMessage = new Message({
      senderType,
      senderId,
      receiverType,
      receiverId,
      message,
      conversationId,
    });

    // Save the message
    await newMessage.save();
    return successResponse(res, {
      message: "Message sent successfully",
      payload: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

/* get all messages */
exports.getAllMessagesBasedOnConversationId = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    console.log(conversationId);

    // Find all messages with the given conversationId
    const messages = await Message.find({ conversationId: conversationId });

    return successResponse(res, {
      payload: messages,
    });
  } catch (error) {
    next(error);
  }
};
