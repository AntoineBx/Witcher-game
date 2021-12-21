var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server,{
  cors:{
    origin : ["http://localhost:3000"]
  }
});

var uuidv1 = require("uuid/v1");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}
var Game = require("./game");
var games = {};
var playersCount = 0;
io.on("connection", function (socket) {
  playersCount++;
  console.log('connect '+playersCount+" "+ socket.id)
  io.emit('totalPlayers', playersCount);
  socket.on("joinGame", joinGame);
  socket.on("leaveGame", leaveGame);
  socket.on("playAgain", playAgain);
  socket.on("move", handleMove);
  socket.on("chat", handleChat);
  socket.on("disconnect", leaveGame);
  socket.on("disconnect", () => {
    playersCount--;
    console.log('disconected '+ playersCount+" "+ socket.id)
    io.emit('totalPlayers', playersCount);
  });
});

function handleChat(msg) {
  games[this.roomName].chat(this.id, msg);
}

function playAgain() {
  games[this.roomName].reset();
}

function joinGame({ username,img,maxPlayers}) {
  console.log("JOINING GAME "+username);
  for (index in games) {
    var game = games[index];
    // console.log(game)
    if (game.canJoin && Object.keys(game.players).length <= 2) {
      this.roomName = game.name;
      game.addPlayer(this, username);
      console.log("adding player to: ", this.roomName)
    }
  }
  if (!this.roomName) {
    var roomID = uuidv1().substring(0, 7);
    games[roomID] = new Game(roomID);
    this.roomName = roomID;
    games[roomID].addPlayer(this, username, img);
    console.log("Creating new room : ", this.roomName)
  }
}

function leaveGame() {
  if (this.roomName) {
    games[this.roomName].removePlayer(this);
    var players = games[this.roomName].sockets;
    if (Object.keys(players).length == 0) delete games[this.roomName];
    delete this.roomName;
  }
}

function handleMove(cellID) {
  games[this.roomName].move(this.id, cellID);
}

function onStart() {
  games[this.roomName].start();
  console.log('Game start')
}

server.listen(process.env.PORT || 5000, () => console.log("server start"));