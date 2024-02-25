const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const { errorResponse } = require("./controllers/response/response.controller");
const customerSupportRouter = require("./routes/customer-support.route");
const userRouter = require("./routes/user.route");
const conversationRouter = require("./routes/conversation.route");
const messageRouter = require("./routes/message.route");

/* 
    making express app
*/
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

let activeCustomerSupport = [];

io.on("connection", (socket) => {
  socket.on("add-customer-support", (user) => {
    socket.join(user.id);
    // if active customer support is not added previously

    if (
      !activeCustomerSupport.some(
        (customerSupport) => customerSupport.socketId === socket.id
      )
    ) {
      activeCustomerSupport.push({ id: user.id, socketId: socket.id });
    }
  });

  socket.on("disconnect", () => {
    // remove the customer support from active users
    activeCustomerSupport = activeCustomerSupport.filter(
      (customerSupport) => customerSupport.socketId !== socket.id
    );
  });

  socket.on("add-user", (data) => {
    socket.join(data.id);
  });

  socket.on("check-active-customer-support", (data) => {
    let randomId;
    if (activeCustomerSupport.length > 0) {
      const uniqueIds = Object.keys(
        activeCustomerSupport.reduce((acc, obj) => {
          acc[obj.id] = true;
          return acc;
        }, {})
      );

      const randomIndex = Math.floor(Math.random() * uniqueIds.length);
      randomId = uniqueIds[randomIndex];
    }

    if (randomId) {
      io.to(data.id).emit("get-random-active-customer-support", {
        id: randomId,
      });
    }
  });

  socket.on("sendMessage", (data) => {
    io.to(data.id).emit("getMessage", data);
  });
});

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

app.use("/api/conversation", conversationRouter);

app.use("/api/message", messageRouter);
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
module.exports = server;
