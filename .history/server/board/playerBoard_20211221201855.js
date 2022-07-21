
class PlayerBoard {
    constructor(playerNumber , deck) {
        this.hand1 = []
        this.graveyard1 = []
        this.passed1 = false;
        this.initialize(deck);
    }
    initialize(deck1, deck2){
        this.deck1 = []
        this.shuffle(deck1).forEach(cardName => {
            this.deck1.push( new Card(cardName) )
        });
        
        //Hold all the info of cards
        this.cards = {}
        let cardsTemp = [...this.deck1, ...this.deck2]
        cardsTemp.forEach((card,index)=>{
        this.cards[card.id] = card
        })
        //Strip decks to only keep card id
        this.deck1.forEach((card,index) =>{
        this.deck1[index] = card.id
        })
        this.deck2.forEach((card,index) =>{
        this.deck2[index] = card.id
        })
    }
}
module.exports = PlayerBoard;