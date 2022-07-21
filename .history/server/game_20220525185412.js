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
  }
  //if socket is defined send to specified socket else broadcast
  send(eventName, data=null, socketId=undefined , broadcast=false){
    if(broadcast){
      this.sockets[socketId].broadcast.emit(eventName, data);
    }else{
      if(socketId != undefined){
        this.sockets[socketId].emit(eventName, data);
        return;
      }
      Object.keys(this.sockets).forEach((playerID) => {
        const socket = this.sockets[playerID];
        socket.emit(eventName, data);
      });
    }
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
  
  preStart(){
    if (this.interval) return;
    this.canJoin = false;
    var time = 5;
    let deck1 = [];
    let deck2 = [];
    let username1 = "";
    let username2 = "";
    this.players.forEach((player,index) =>{
      if(index == 0){
        deck1 = player.deck;
        username1 = player.username;
      } 
      if(index == 1){
        deck2 = player.deck; 
        username2 = player.username;
      } 
    })
    this.board = new Board(deck1,deck2,username1,username2);
    this.send("BoardUpdate", this.board);
    this.interval = setInterval(() => {
      this.send("waiting", {waiting : true, time:time , maxPlayer : true});
      time--;
      if (time == -1) {
        clearInterval(this.interval);
        this.interval = null;
        this.start();
      }
    }, 300);
  }
  start(){
    this.isStart = true;
    this.canPlay = true;
    this.board.drawCards(7)
    this.send("start")
    this.send("waiting", {waiting : false, time:0 , maxPlayer : true});
    this.send("BoardUpdate", this.board);
    console.log("sockets : : ", this.players[0].socket)
    setTimeout(() => {
      this.send("cardPicker", 
      { 
        cards : this.board.hand1,
        fromWhere : 'hand',
        toWhere : 'deck',
        numberOfCards : 2
      }, 
      this.players[0].socket,false)

      this.send("cardPicker", 
      { 
        cards : this.board.hand2,
        fromWhere : 'hand',
        toWhere : 'deck',
        numberOfCards : 2
      },
      this.players[1].socket,false)


      this.send("playerTurnUpdate",this.board.playerTurn)
    }, 2000);
  }
  passed(player){
    this.board.setPlayerPassed(player)
    this.board.nextPlayerTurn();
    this.send("playerTurnUpdate",this.board.playerTurn)
    this.send("BoardUpdate", this.board);

    if(this.board.allHavePassed()){
      console.log("all Have Passed");
      let score = this.board.score();
      setTimeout(() => {
        let winner = this.board.getWinner()
        this.board.loseLife( winner == 1 ? 2 :
                             winner == 2 ? 1 : 0);
        this.send("getWinnerRound", winner)
        setTimeout(() => {
          this.send("lifeUpdate", { life1 : this.board.life1 , life2 : this.board.life2 })
        }, 1000);
        if(this.board.checkIfDead() != 0){
          setTimeout(() => {
            this.send("endOfGame",this.board.checkIfDead() == 1 ? 2 : 1)
          }, 1500);
        }
        setTimeout(() => {
          this.board.endRound();
          this.board.startNewRound();
          this.board.nextPlayerTurn();
          this.send("playerTurnUpdate",this.board.playerTurn)
          this.send("BoardUpdate", this.board);
        }, 2500);
      }, 1000);
    }
  }

  placeCardOnField(socket,idCard,row,position){
    let foundIn = this.board.findCard(idCard);
   
    //  console.log("foundIn",foundIn)
    if(foundIn != undefined){
      this.board.removeCard(foundIn.boardElement,foundIn.row,foundIn.position)
    }
    let cardDiscardAbilitie = this.board.getCardAbilitie(idCard, "discards");
    let cardDiscard = false;
    if(cardDiscardAbilitie == true){
      cardDiscard = true;
    }
    if(cardDiscard){
      this.board.addCard('graveyard'+ this.board.playerTurn ,idCard)
    }else{
      this.board.addStatus(idCard, "onField")
      this.board.addCard('fields',idCard,row,position)
    }
    this.doAbilities(idCard);
    this.board.calculatePowerField()
    this.send("BoardUpdate", this.board);
    if(cardDiscard){
      this.send("ShowcaseCard", {idCard});
    }else{
      this.send("ShowcaseCard", {idCard}, socket.id,true)
    }
    
    setTimeout(() => {
      this.board.nextPlayerTurn();
      this.send("playerTurnUpdate",this.board.playerTurn);
      this.board.score();
      this.send("BoardUpdate", this.board);
    }, 1500);
  }
  //trigger abilities of the specified card
  doAbilities(idCard){
    console.log(this.board.cards[idCard].abilities)
    if( this.board.cards[idCard].abilities != undefined ){
      Object.keys(this.board.cards[idCard].abilities).forEach((abilitie)=>{
        // console.log(abilitie, " : ",this.board.cards[idCard].abilities[abilitie]);
        switch(abilitie) {
          case 'weather':
            this.board.setWeather(this.board.cards[idCard].abilities[abilitie])
            break;
          case 'spy':
            this.board.drawCards(2,this.board.playerTurn);
            break;
          case 'scorch':
            let cardsToRemove = this.board.scorching(0);
            this.send( "scorching", cardsToRemove );
            cardsToRemove.forEach((el)=>{
              let foundIn = this.board.findCard(el);
              if(foundIn != undefined){
                this.board.removeCard(foundIn.boardElement,foundIn.row,foundIn.position)
                let playerCard = 2;
                if(foundIn.row > 2 ){
                   playerCard = 1
                }
                this.board.addToGraveyard(el,playerCard)
              }
            })
            break;
          default:
        }
      })
    }
  }
  
  moveCards(player,cards,fromWhere,toWhere,replace){
    this.board.moveCards(player,cards,fromWhere,toWhere,replace);
    this.send("BoardUpdate", this.board);
  }
  
  reset(){
    this.board = new Board();
    this.isStart = false;
    this.canPlay = false;
    this.canJoin = true;
    if (Object.keys(this.players).length == this.maxPlayers) this.preStart();
  }

}

module.exports = Game;