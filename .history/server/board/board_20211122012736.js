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
    this.initialize(deck1,deck2);
    this.deck1 = []
    this.deck2 = []
    
    this.turn = 0;
  }

  initialize(deck1, deck2){
    console.log("board initialize")
    console.log(deck1);
    deck1.forEach(cardName => {
      this.deck1.push( new Card(cardName) )
    });
    deck2.forEach(cardName => {
      this.deck2.push( new Card(cardName) )
    });
    console.log(this.deck1);
  }
}

module.exports = Board;