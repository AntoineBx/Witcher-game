

class Player {
  constructor(socket, username, deck, playerPosition) {
    this.socket = socket;
    this.playerPosition = playerPosition
    this.username = username;
    this.deck = deck;
  }
  
}
module.exports = Player;
