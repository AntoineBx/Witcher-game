
class PlayerBoard {
    constructor(playerNumber , deck) {
        this.hand1 = []
        this.graveyard1 = []
        this.passed1 = false;
        this.initialize(deck);
    }
}
module.exports = PlayerBoard;