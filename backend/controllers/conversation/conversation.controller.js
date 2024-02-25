const createHttpError = require("http-errors");
const Conversation = require("../../models/conversation.model");
const { successResponse } = require("../response/response.controller");

/* create conversation */
exports.createConversation = async (req, res, next) => {
  try {
    const { creatorId, participantId } = req.body;
    if (!creatorId || !participantId) {
      throw createHttpError(400, "Missing required fields");
    }
    const conversation = new Conversation({
      creatorId,
      participantId,
    });
    await conversation.save();

    // Populate the creatorId and participantId fields with the full information of the corresponding users
    // await conversation
    //   .populate("creatorId")
    //   .populate("participantId")
    //   .execPopulate();

    return successResponse(res, {
      message: "Conversation created successfully",
      payload: conversation,
    });
  } catch (error) {
    next(error);
  }
};

/* get all conversation */

exports.getConversation = async (req, res, next) => {
  try {
    const { _id } = req.customerSupport;

    const conversations = await Conversation.find({ participantId: _id })
      .populate("creatorId")
      .populate("participantId");

    return successResponse(res, {
      message: "Conversation fetched successfully",
      payload: conversations,
    });
  } catch (error) {
    next(error);
  }
};
