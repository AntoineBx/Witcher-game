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
    deck1.forEach(cardName => {
      this.deck1.push(new Card(cardName))
    });
    this.deck1 = new Card("ciri");
    console.log(this.deck1);
    this.turn = 0;
  }

  initialize(deck1, deck2){
    
  }
}

module.exports = Board;