var uuidv1 = require("uuid/v1");

class Player {
  constructor(id, username, deck) {
    this.username = username;
    this.id = id;
    this.deck = deck
    this.initialize()
  }
  initialize(){
    this.deck.forEach((card,index) => {
      console.log(card, index)
      this.deck[index].name = card;
      this.deck[index].id = 
    });
  }
}
module.exports = Player;
