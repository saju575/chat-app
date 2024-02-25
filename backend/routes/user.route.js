const express = require("express");
const {
  createUser,
  updateUser,
} = require("../controllers/user/user.controller");

const userRouter = express.Router();

/* create user */
userRouter.post("/create", createUser);

/* update a perticular user */
userRouter.put("/update/:id", updateUser);

module.exports = userRouter;
