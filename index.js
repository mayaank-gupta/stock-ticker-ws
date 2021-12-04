const express = require('express');
const socketIo = require("socket.io");

const app = express();

console.log("__dirname", __dirname);

const appInstance = app.listen(4000);

const webSocket = socketIo(appInstance);

webSocket.on("connection", (socket) => {
  socket.emit("mainSocketMsg", {
    ...stockList.filter((socket) => socket.name),
  });
});
