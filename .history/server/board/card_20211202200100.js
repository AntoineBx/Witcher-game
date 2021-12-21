var uuidv1 = require("uuid/v1");
let CardJson = require("../../data/cards.json");

class Card {
    constructor(cardName) {
      this.id = cardName+"_"+uuidv1().substring(0, 8);;
      this.setData(cardName)
    }
    
    setData(cardName){
      const currentCard = CardJson.cards[cardName];
      if(currentCard == undefined)return;
      this.name = currentCard.name;
      this.folderName = currentCard.folderName;
      this.power = currentCard.power;
      this.positioning = currentCard.positioning;
      this.abilities = currentCard.abilities;
    }
    getPower() {
      return this.power;
    }
    getName() {
      return this.name;
    }
  
    getImage() {
      return this.pic;
    }
  
    getFaction() {
      return this.faction;
    }
  
    getType() {
      return this.type;
    }
  
    reset() {}
  }
  
  module.exports = Card;
  