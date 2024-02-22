const express = require("express");
const { createUser } = require("../controllers/user/user.controller");

const userRouter = express.Router();

/* create user */
userRouter.post("/create", createUser);

module.exports = userRouter;
