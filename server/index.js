var express = require("express");
var app = express();
var server = require("http").Server(app);

globalThis.io = require("socket.io")(server,{
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
globalThis.io.on("connection", function (socket) {
  playersCount++;
  console.log('connect '+playersCount+" "+ socket.id)
  globalThis.io.emit('totalPlayers', playersCount);
  socket.on("joinGame", joinGame);
  socket.on("leaveGame", leaveGame);
  socket.on("playAgain", playAgain);
  socket.on("placeCardOnField", handlePlaceCardOnField);
  socket.on("cardsPicked", handlePickCards);
  socket.on("chat", handleChat);
  socket.on("passed", handlePassed)
  socket.on("disconnect", leaveGame);
  socket.on("disconnect", () => {
    playersCount--;
    console.log('disconected '+ playersCount+" "+ socket.id)
    globalThis.io.emit('totalPlayers', playersCount);
  });
});

function handleChat(msg) {
  games[this.roomName].chat(this.id, msg);
}

function playAgain() {
  games[this.roomName].reset();
}

function joinGame({ username,deck}) {
  console.log("JOINING GAME "+username);
  for (index in games) {
    var game = games[index];
    if (game.canJoin && Object.keys(game.players).length <= 2) {
      this.roomName = game.gameId;
      game.addPlayer(this, username, deck);
      console.log("adding player to: ", this.roomName)
    }
  }
  if (!this.roomName) {
    var roomID = uuidv1().substring(0, 7);
    games[roomID] = new Game(roomID);
    this.roomName = roomID;
    games[roomID].addPlayer(this, username, deck);
    console.log("Creating new room : ", this.roomName)
  }
}

function leaveGame() {
  console.log("leave Game")
  if (this.roomName) {
    games[this.roomName].removePlayer(this);
    var players = games[this.roomName].sockets;
    if (Object.keys(players).length == 0) delete games[this.roomName];
    delete this.roomName;
  }
}
function handlePlaceCardOnField({idCard,row,position}) {
  if(this.roomName){
    console.log("Move in ",this.roomName)
    games[this.roomName].placeCardOnField(this,idCard,row,position);
  }else{
    console.error("Error : RoomName is expired")
  }
}
function handlePickCards({player,cards,fromWhere,toWhere,replace}){
  console.log("handleMoveCards",{player,cards,fromWhere,toWhere})
  if(this.roomName){
    games[this.roomName].moveCards(player,cards,fromWhere,toWhere,replace);
  }else{
    console.error("Error : RoomName is expired")
  }
}
function handlePassed(player){
  console.log("handlePassed : ", player);
  games[this.roomName].passed(player);
}

server.listen(process.env.PORT || 5005, () => console.log("server start"));