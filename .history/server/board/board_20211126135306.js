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
    this.turn = 1;
    this.initialize(deck1,deck2);
    this.hand1 = []
    this.hand2 = []
    this.graveyard1 = []
    this.graveyard2 = []
    
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
    this.cards = [...this.deck1, ...this.deck2]
    
  //Strip decks to only keep id
    this.deck1.forEach((card,index) =>{
      this.deck1[index] = card.id
    })
    this.deck2.forEach((card,index) =>{
      this.deck2[index] = card.id
    })
  }
  

  getAllCards(){
    
    return 
  }
  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  addCard(boardElement,idCard,row,position){
    if(boardElement == 'fields'){
      console.log("this[boardElement][row]",this.fields)
      this.fields[row].cards.splice(position,0, idCard);
    }else{
      this[boardElement].splice(position, 1)
    }
  }
  removeCard(boardElement,row,position){
    if(boardElement == 'fields'){
      this[boardElement][row].cards.splice(position, 1);
    }else{
      this[boardElement].splice(position, 1)
    }
  }

  //Return Value exemple {boardElement:"fields",row:2, position:9}
  findCard(idCard){
    // console.log("deck1",this.deck1);
    // console.log("fields",this.fields);
    let foundIn = {}
    //Search through Fields array
    this.fields.forEach((line,index)=>{
      line.cards.forEach((cardId,indexCard)=>{
        if(cardId == idCard){
          foundIn.boardElement = "fields";
          foundIn.row = index
          foundIn.position = indexCard
        }
      })
    })
    //Search through decks
    this.deck1.forEach((cardId,index)=>{
      if(cardId == idCard){
        foundIn.boardElement =  "deck1";
        foundIn.position = index
        console.log("found in deck1")
      }
    })
    this.deck2.forEach((cardId,index)=>{
      if(cardId == idCard){
        foundIn.boardElement =  "deck2";
        foundIn.position = index
        console.log("found in deck2")
      }
    })
    return foundIn;
  }



}

module.exports = Board;