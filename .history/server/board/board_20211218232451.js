let Card = require("./Card");

class Board {
  constructor(deck1,deck2) {
    this.fields = [
        {type : "siege",side : 2, cards : []},
        {type : "ranged",side : 2, cards : []},
        {type : "infantry",side : 2, cards : []},
        {type : "infantry",side : 1, cards : []},
        {type : "ranged",side : 1, cards : []},
        {type : "siege",side : 1, cards : []},
    ],
    this.playerTurn = 1;
    this.round = 1;
    this.initialize(deck1,deck2);
    this.hand1 = []
    this.hand2 = []
    this.graveyard1 = []
    this.graveyard2 = []
    this.passed1 = false;
    this.passed2 = false;
  }

  initialize(deck1, deck2){
    this.deck1 = []
    this.deck2 = []
    this.shuffle(deck1).forEach(cardName => {
      this.deck1.push( new Card(cardName) )
    });
    this.shuffle(deck2).forEach(cardName => {
      this.deck2.push( new Card(cardName) )
    });
    //Hold all the info of cards
    this.cards = {}
    let cardsTemp = [...this.deck1, ...this.deck2]
    cardsTemp.forEach((card,index)=>{
      this.cards[card.id] = card
    })
    //Strip decks to only keep card id
    this.deck1.forEach((card,index) =>{
      this.deck1[index] = card.id
    })
    this.deck2.forEach((card,index) =>{
      this.deck2[index] = card.id
    })
  }
  endRound(){
    this.emptyField()
    this.round++;
  }
  drawHands( numberCards ){
    for (let index = 0; index < numberCards; index++) {
      let tempCard = this.deck1.slice(-1)
      this.deck1.pop()
      this.hand1.push(tempCard)

      let tempCard2 = this.deck2.slice(-1)
      this.deck2.pop()
      this.hand2.push(tempCard2)
    }
  }
  
  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
  nextPlayerTurn(){
    if(this.playerTurn == 1){
      console.log("playerTurn 1");
      console.log("this.passed2",this.passed2);
      if(this.passed2){
        this.playerTurn = 1
      }else{
        this.playerTurn = 2
      }
     return; 
    }
    if(this.playerTurn == 2){
      if(this.passed1){
        this.playerTurn = 2
      }else{
        this.playerTurn = 1
      }
    }
  }
  allPassed(){
    if(this.passed1 == true && this.passed2 == true){
      return true;
    }
    return false;
  }
  
  addCard(boardElement,idCard,row,position = this.fields.length){
    console.log(idCard);
    if(boardElement == 'fields'){
      this.cards[idCard].zindex = row+1;
      this.fields[row].cards.splice(position,0, idCard);
    }else{
      this[boardElement].splice(position, 1)
    }
  }
  setPlayerPassed(player){
    console.log("setPlayerPassed : ", player);
    
      this['passed'+player] = true;
  }

  
  addStatus(idCard, status){
    this.cards[idCard].status == status
    if(this.cards[idCard] != undefined){
      if(this.cards[idCard]?.status != undefined){
          if(this.cards[idCard].status.indexOf(status) === -1){
            this.cards[idCard].status.push(status)
          }
      }else{
        this.cards[idCard].status = [status]
      }
    }
  }
  removeStatus(idCard, status){
    if(this.cards[idCard] != undefined){
      let indexOf = this.cards[idCard].status.indexOf(status)
      if(indexOf === -1){
        this.cards[idCard].status.splice(indexOf,1)
      }
    }
  }
  removeAllStatus(idCard){
    console.log("removeAllStatus : ", idCard);
    if(this.cards[idCard] != undefined){
      console.log("removeAllStatus", this.cards[idCard].status);
        this.cards[idCard].status = undefined
    }
  }
  removeCard(boardElement,row,position){
    if(boardElement == 'fields'){
      this[boardElement][row].cards.splice(position, 1);
    }else{
      this[boardElement].splice(position, 1)
    }
  }

  emptyField(){
    this.fields.forEach((line,index)=>{
      let newGrave = this.fields[index].cards.splice(0, this.fields[index].cards.length)
      if(index >= 2){
        this.graveyard1 = [...this.graveyard1, ...newGrave]
      }else{
        this.graveyard2 = [...this.graveyard2, ...newGrave]
      }
    })
    //remove status from card
    this.graveyard1.forEach(idCard => {
      this.removeAllStatus(idCard)
    });
    this.graveyard2.forEach(idCard => {
      this.removeAllStatus(idCard)
    });
    
  }

  //Return Value exemple {boardElement:"fields",row:2, position:9}
  findCard(idCard){
    // console.log("deck1",this.deck1);
    // console.log("fields",this.fields);
    let foundIn = undefined;
    //Search through Fields array
    this.fields.forEach((line,index)=>{
      line.cards.forEach((cardId,indexCard)=>{
        if(cardId == idCard){
          console.log("card found in fields")
          foundIn = {}
          foundIn.boardElement = "fields";
          foundIn.row = index
          foundIn.position = indexCard
        }
      })
    })
    //Search through all other places a card can be found
    let allElement = ['deck1','deck2','hand1','hand2','graveyard1','graveyard2']
    allElement.forEach((element)=>{
      this[element].forEach((cardId,index)=>{
        if(cardId == idCard){
          foundIn = {}
          console.log("card found in "+ element)
          foundIn.boardElement =  element;
          foundIn.position = index
        }
      })
    })
    return foundIn;
  }



}

module.exports = Board;