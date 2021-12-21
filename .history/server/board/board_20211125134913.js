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
  }
  
  
  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }




  //Return Value {element:"fields",row:2, position:9}
  findCard(idCard){
    let foundIn = {}
    //Search through Fields array
    this.fields.forEach((line,index)=>{
      line.cards.forEach((card,indexCard)=>{
        if(card.uuid == idCard){
          foundIn.element = "fields";
          foundIn.row = index
          foundIn.position = indexCard
        }
      })
    })
    //Search through decks
    this.deck1.forEach((card,index)=>{
      if(card.id == idCard){
        foundIn.element =  "deck1";
        foundIn.position = index
      }
    })
    this.deck2.forEach((card,index)=>{
      if(card.id == idCard){
        foundIn.element =  "deck2";
        foundIn.position = index
      }
    })

    return foundIn;
  }



}

module.exports = Board;