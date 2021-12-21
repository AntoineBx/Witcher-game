var uuidv1 = require("uuid/v1");

class Player {
  constructor(id, username, deck) {
    this.username = username;
    this.id = id;
    this.deck = []
    this.initialize(deck)
  }
  initialize(deck){
    deck.forEach((card,index) => {
      
      this.deck[index].name = card;
      this.deck[index].id = uuidv1();
      console.log(card)
    });
  }
}
module.exports = Player;
