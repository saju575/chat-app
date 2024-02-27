const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const User = require("../../models/user.model");
const { successResponse } = require("../response/response.controller");

/* create user */
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      throw createHttpError(400, "Missing required fields");
    }

    const newUser = new User({ name, email, phone });
    const savedUser = await newUser.save();

    return successResponse(res, {
      message: "User created successfully",
      payload: savedUser,
    });
  } catch (error) {
    next(error);
  }
};

/* update user */
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { customer_support_id, conversation_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(400, "Invalid ID");
    }

    if (!customer_support_id || !conversation_id) {
      throw createHttpError(400, "Missing required fields");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        customer_support_id,
        conversation_id,
        is_customer_support_assign: true,
      },
      { new: true }
    );

    return successResponse(res, {
      message: "User updated successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createHttpError(400, "Invalid ID");
    }

    const user = await User.findById(id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    return successResponse(res, {
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
