const express = require("express");

const { isAuthenticated } = require("../middlewares/auth.middleware");
const {
  createConversation,
  getConversation,
} = require("../controllers/conversation/conversation.controller");
const conversationRouter = express.Router();

/* create conversation route */
conversationRouter.post("/create", createConversation);

/* get all conversations of login customer support */
conversationRouter.get("/all", isAuthenticated, getConversation);

module.exports = conversationRouter;
