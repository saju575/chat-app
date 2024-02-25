const express = require("express");
const {
  createNewMessage,
  getAllMessagesBasedOnConversationId,
} = require("../controllers/message/message.controller");

const messageRouter = express.Router();

/* create new message */
messageRouter.post("/create", createNewMessage);

/* get all messages under an conversation id */
messageRouter.get("/all/:conversationId", getAllMessagesBasedOnConversationId);

module.exports = messageRouter;
