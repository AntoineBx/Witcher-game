var uuidv1 = require("uuid/v1");

class Player {
  constructor(id, username, deck) {
    this.username = username;
    this.id = id;
    this.deck = {}
    this.initialize(deck)
  }
  initialize(deck){
    deck.forEach((cardName,index) => {
      
      this.deck[index] = uuidv1();
      
    });
    console.log(this.deck)
  }
}
module.exports = Player;
