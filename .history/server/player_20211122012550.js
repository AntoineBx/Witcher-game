

class Player {
  constructor(id, username, deck, playerPosition) {
    this.playerPosition = playerPosition
    this.username = username;
    this.id = id;
    this.deck = []
    this.initialize(deck)
  }
  initialize(deck){
    console.log("initialize")
   
    deck.forEach((cardName,index) => {
      let card = {cardName : cardName}
      this.deck[index] = card;
    });
    console.log(this.deck);
  }
}
module.exports = Player;
