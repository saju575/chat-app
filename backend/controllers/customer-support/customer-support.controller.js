const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomerSupport = require("../../models/customer-support.model");
const { successResponse } = require("../response/response.controller");
const { createJWTToken } = require("../../helper/jwt.helper");
const { JWT_ACCESS_KEY, COOKIES_NAME_1 } = require("../../secret");

/** create new customer support  */
exports.createCustomerSupport = async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;

    // Check if required fields are present
    if (!name || !email || !password || !username) {
      throw createHttpError(400, "Missing required fields");
    }

    // Check if email or username is already in use
    const existingUser = await CustomerSupport.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw createHttpError(409, "Email or username already in use");
    }

    const customerSupport = new CustomerSupport({
      name,
      email,
      password,
      username,
    });
    await customerSupport.save();

    return successResponse(res, {
      payload: { ...customerSupport._doc, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

/* get all customer support */
exports.getAllCustomerSupport = async (req, res, next) => {
  try {
    const customerSupportUsers = await CustomerSupport.find({
      role: "customerSupport",
    });

    return successResponse(res, {
      payload: customerSupportUsers,
    });
  } catch (error) {
    next(error);
  }
};

/* get single customer support */
exports.getCustomerSupportById = async (req, res, next) => {
  try {
    const { customerSupportId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(customerSupportId)) {
      throw createHttpError(400, "Invalid ID");
    }

    const customerSupportUser = await CustomerSupport.findById(
      customerSupportId
    );
    if (!customerSupportUser) {
      throw createHttpError(404, "Customer support user not found");
    }

    return successResponse(res, {
      payload: customerSupportUser,
    });
  } catch (error) {
    next(error);
  }
};

/* login */
exports.login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Find user by email or username
    const user = await CustomerSupport.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    }).select("+password");

    if (!user) {
      throw createHttpError(404, "Please register first.");
    }

    // compare the password

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      throw createHttpError(401, "Phone/password mismatch");
    }

    const accessToken = createJWTToken(
      { _id: user._id, isAdmin: user.isAdmin },
      JWT_ACCESS_KEY,
      "120 days"
    );

    // set cookies
    res.cookie(COOKIES_NAME_1, accessToken, {
      maxAge: 60 * 60 * 24 * 120 * 1000,
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
      path: "/",
    });

    // successful response
    return successResponse(res, {
      message: "Login successfully",
      payload: {
        customerSupport: { ...user._doc, password: undefined },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie(COOKIES_NAME_1, {
      // sameSite: "None",
      // secure: true,
      path: "/",
    });
    return successResponse(res, {
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* get customer support profile */
exports.getCustomerSupportProfilee = async (req, res, next) => {
  try {
    const user = req.customerSupport;
    if (!user) {
      throw createHttpError(404, "Customer support not found");
    }
    return successResponse(res, {
      message: "Get Customer support profile successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
