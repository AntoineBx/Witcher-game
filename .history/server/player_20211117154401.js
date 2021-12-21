class Player {
  constructor(id, username, img, isBot) {
    this.username = username;
    this.id = id;
    if (isBot) this.smart = Math.floor(Math.random() * 10);
  }
  
}
module.exports = Player;
