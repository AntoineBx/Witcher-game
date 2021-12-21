const Player = require("./player");
const Board = require("./board/board");

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.sockets = {};
    this.players = [];
    this.currentTurn = null;
    this.board = {};
    this.isStart = false;
    this.canPlay = false;
    this.canJoin = true;
    this.winner = {
    };
  }
  //if socket is defined send to socket else broadcast
  send( eventName, data=null, socketId=undefined ){
    if(socketId != undefined){
      this.sockets[socketId].emit(eventName, data);
      return;
    }
    Object.keys(this.sockets).forEach((playerID) => {
      const socket = this.sockets[playerID];
      socket.emit(eventName, data);
    });
  }


  chat(id, msg) {
    this.send("chat",{ id:id, msg:msg })
  }

  addPlayer(socket, username, deck){
    if (!this.canJoin) return;
    this.sockets[socket.id] = socket;
    let playerPosition = Object.keys(this.players).length == 0 ? 1 : 2
    
    this.players.push( new Player(socket.id, username, deck, playerPosition) );
    this.send("playerPosition", playerPosition, socket.id)
    if (this.players.length == 2){
      this.preStart();
    }else{
      this.send("waiting", {waiting : true, time:0 , maxPlayer : false})
    }
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }
  
  preStart() {
    if (this.interval) return;
    this.canJoin = false;
    var time = 5;
    let deck1 = [];
    let deck2 = [];
    this.players.forEach((player,index) =>{
      if(index == 0) deck1 = player.deck;
      if(index == 1) deck2 = player.deck; 
    })
    this.board = new Board(deck1,deck2);
    console.log("this.board.cards" , this.board.cards);
    this.send("initAllCards", this.board.cards);
    this.interval = setInterval(() => {
      this.send("waiting", {waiting : true, time:time , maxPlayer : true});
      console.log("wait : ",time);
      time--;
      if (time == -1) {
        clearInterval(this.interval);
        this.interval = null;
        this.start();
      }
    }, 200);
  }
  start() {
    this.isStart = true;
    this.canPlay = true;
    
    
    this.send("start")
    this.send("waiting", {waiting : false, time:0 , maxPlayer : true});
  }



  placeCardOnField(idCard,row,position){
    console.log("placeCardOnField");
    let foundIn = this.board.findCard(idCard);
    // console.log("foundIn",foundIn)
    if(foundIn != undefined){
      this.board.removeCard(foundIn.boardElement,foundIn.row,foundIn.position)
    }
    this.board.addStatus(idCard, "onField")
    this.board.addCard('fields',idCard,row,position)
    setTimeout(() => {
      this.send("BoardUpdate", this.board);
    }, 1000);
    
  }

  reset() {
    this.board = new Board();
    this.isStart = false;
    this.canPlay = false;
    this.canJoin = true;
    this.winner = {
      img: ""
    };
    if (Object.keys(this.players).length == this.maxPlayers) this.preStart();
  }

}

module.exports = Game;