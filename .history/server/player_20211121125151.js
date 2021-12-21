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
    });
  }
}
module.exports = Player;
