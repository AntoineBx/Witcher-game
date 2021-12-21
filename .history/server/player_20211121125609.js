var uuidv1 = require("uuid/v1");

class Player {
  constructor(id, username, deck) {
    this.username = username;
    this.id = id;
    this.deck = []
    this.initialize(deck)
  }
  initialize(deck){
    deck.forEach((cardName,index) => {
      console.log(cardName)
      this.deck[index].name = card;
      this.deck[index].id = uuidv1();
      
    });
  }
}
module.exports = Player;
