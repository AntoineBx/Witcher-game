

class PlayerBoard {
    constructor(playerNumber , deck) {
        this.hand = []
        this.graveyard = []
        this.passed = false;
        this.initialize(deck);
    }
    initialize(deck){
        
       
        
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
    draw(numberCards){
        for (let index = 0; index < numberCards; index++) {
          let tempCard = this.deck.slice(-1)
          this.deck.pop()
          this.addStatus(tempCard, 'onHand')
          this.hand1.push(tempCard)
    
          let tempCard2 = this.deck2.slice(-1)
          this.addStatus(tempCard2, 'onHand')
          this.deck2.pop()
          this.hand2.push(tempCard2)
        }
      }
}
module.exports = PlayerBoard;