
class PlayerBoard {
    constructor(playerNumber , deck) {
        this.hand = []
        this.graveyard = []
        this.passed = false;
        this.initialize(deck);
    }
    initialize(deck1, deck2){
        this.deck = []
        this.shuffle(deck).forEach(cardName => {
            this.deck.push( new Card(cardName) )
        });
        
        //Hold all the info of cards
        this.cards = this.deck
        
        //Strip decks to only keep card id
        this.deck.forEach((card,index) =>{
            this.deck[index] = card.id
        })
    }
    shuffle(deck){
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }
}
module.exports = PlayerBoard;