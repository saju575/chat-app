// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// /*
//     making express app
// */
// const app = express();

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     credentials: true,
//   },
// });

// let activeCustomerSupport = [];

// io.on("connection", (socket) => {
//   socket.on("add-customer-support", (user) => {
//     socket.join(user.id);
//     // if active customer support is not added previously

//     if (
//       !activeCustomerSupport.some(
//         (customerSupport) => customerSupport.socketId === socket.id
//       )
//     ) {
//       activeCustomerSupport.push({ id: user.id, socketId: socket.id });
//     }
//   });

//   /* relay the new created conversation */

//   socket.on("new-conversation", (data) => {
//     io.to(data.id).emit("new-conversation", data);
//   })

//   socket.on("disconnect", () => {
//     // remove the customer support from active users
//     activeCustomerSupport = activeCustomerSupport.filter(
//       (customerSupport) => customerSupport.socketId !== socket.id
//     );
//   });

//   /* client part */
//   socket.on("add-user", (data) => {
//     socket.join(data.id);
//   });

//   socket.on("check-active-customer-support", (data) => {
//     let randomId;
//     if (activeCustomerSupport.length > 0) {
//       const uniqueIds = Object.keys(
//         activeCustomerSupport.reduce((acc, obj) => {
//           acc[obj.id] = true;
//           return acc;
//         }, {})
//       );

//       const randomIndex = Math.floor(Math.random() * uniqueIds.length);
//       randomId = uniqueIds[randomIndex];
//     }

//     if (randomId) {
//       io.to(data.id).emit("get-random-active-customer-support", {
//         id: randomId,
//       });
//     }
//   });

//   socket.on("sendMessage", (data) => {
//     io.to(data.id).emit("getMessage", data);
//   });

//   /* client part end */
// });

// module.exports = {
//   app,
//   server,
// };
