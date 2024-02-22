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
