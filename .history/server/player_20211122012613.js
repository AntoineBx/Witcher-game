

class Player {
  constructor(id, username, deck, playerPosition) {
    this.playerPosition = playerPosition
    this.username = username;
    this.id = id;
    this.deck = deck
    this.initialize(deck)
  }
  
}
module.exports = Player;
