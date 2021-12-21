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
  }

  initialize(deck1, deck2){
    this.deck1 = []
    this.deck2 = []
    deck1.forEach(cardName => {
      this.deck1.push( new Card(cardName) )
    });
    deck2.forEach(cardName => {
      this.deck2.push( new Card(cardName) )
    });
    this.deck1 = shuffle(deck1)
    this.deck2 = shuffle(deck2)
  }


  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
}

module.exports = Board;