const express = require("express");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const { errorResponse } = require("./controllers/response/response.controller");
const customerSupportRouter = require("./routes/customer-support.route");
const userRouter = require("./routes/user.route");

/* 
    making express app
*/
const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.io = io;

/* 
    default middlewares
*/
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* main routes */
app.use("/api/customer-support", customerSupportRouter);

app.use("/api/user", userRouter);

/*
    Client error handler
 */
app.use((req, res, next) => {
  next(createHttpError(404, "Route Not Found"));
});

/**
Server error handler
-> all the error comes here
*/
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

/* 
  exporting express app
  */
module.exports = app;
