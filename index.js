const express = require("express");
const socketIo = require("socket.io");
const { stockList, updateStockList } = require("./utilities").dummyStocks;

const app = express();

const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const appInstance = app.listen(PORT);

const STOCK_REFRESH_INTERVAL = 2000;
const webSocket = socketIo(appInstance);

stockList.forEach((stock) => {
  const stockWS = webSocket.of(`/${stock.name}`);
  stockWS.on("connection", (socket) => {
    stockUpdateService(socket, stock.name);
  });
});

const stockUpdateService = (socket, stockName) => {
  socket.emit("stockUpdateMsg", updateStockList(stockName));
  const stockTickerInterval = setInterval(() => {
    socket.emit("stockUpdateMsg", updateStockList(stockName));
  }, STOCK_REFRESH_INTERVAL);
  socket.on("disconnect", () => clearInterval(stockTickerInterval));
};
