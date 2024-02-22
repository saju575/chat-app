const createHttpError = require("http-errors");

const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY, COOKIES_NAME_1 } = require("../secret");

const CustomerSupport = require("../models/customer-support.model");

/* 
    authinticated user checking
*/

exports.isAuthenticated = async (req, res, next) => {
  try {
    const access_token = req.cookies[COOKIES_NAME_1];

    if (!access_token) {
      throw createHttpError(404, "Access token missing.Please login first");
    }

    const decode = jwt.verify(access_token, JWT_ACCESS_KEY);

    if (!decode) {
      throw createHttpError(401, "Access token is not valid");
    }

    const user = await CustomerSupport.findById(decode._id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    req.customerSupport = user;

    next();
  } catch (error) {
    next(error);
  }
};

/* 
    authorization user role
*/

exports.authorizeRole =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.customerSupport.role)) {
        throw createHttpError(
          403,
          `Role ${req.customerSupport.role} is not allowed`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
