class Player {
  constructor(id, username, deck) {
    this.username = username;
    this.id = id;
    this.deck = deck
    this.initialize()
  }
  initialize(){
    this.deck.forEach(card => {
      console.log(card)
    });
  }
}
module.exports = Player;
