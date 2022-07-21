let Card = require("./Card");

class Board {
  constructor(deck1,deck2,username1,username2) {
    this.fields = [
        {type : "siege",side : 2, buff:false, frozen:false, cards : []},
        {type : "ranged",side : 2, buff:false, frozen:false, cards : []},
        {type : "infantry",side : 2, buff:false, frozen:false, cards : []},
        {type : "infantry",side : 1, buff:false, frozen:false, cards : []},
        {type : "ranged",side : 1, buff:false, frozen:false, cards : []},
        {type : "siege",side : 1, buff:false, frozen:false, cards : []},
    ],
    this.startingPlayer = 1
    this.playerTurn = 1;
    this.round = 1;
    this.initialize(deck1,deck2);
    this.username1 = username1;
    this.username2 = username2;
    this.passed1 = false;
    this.passed2 = false;
    this.life1 = 2;
    this.life2 = 2;
    this.score1 = 0;
    this.score2 = 0;
    this.hand1 = [];
    this.hand2 = [];
    this.graveyard1 = [];
    this.graveyard2 = [];
  }
  moveCards(player,cards,fromWhere,toWhere,replace){
    //Boolean to Replace card moved from hand to deck
    if(replace){
      this.drawCards(cards.length,player);
    }
    cards.forEach(cardId=>{
      let indexToRemove = this[fromWhere+player].indexOf(cardId);
      if(indexToRemove != -1){
        this[fromWhere+player].splice(indexToRemove,1);
      }
      this[toWhere+player].push(cardId);
      if(toWhere == 'deck'){
        this.shuffle([toWhere+player])
      }
    })
  }
  initialize(deck1, deck2){
    this.deck1 = []
    this.deck2 = []
    this.shuffle(deck1).forEach(cardName => {
      this.deck1.push( new Card(cardName) )
    });
    this.shuffle(deck2).forEach(cardName => {
      this.deck2.push( new Card(cardName) )
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
 
  endRound(){
    console.log("ENDROUND");
    this.emptyField()
    this.round++;
    this.score1 = 0;
    this.score2 = 0;
    this.passed1 = false;
    this.passed2 = false;
  }
  
  startNewRound(){
    this.drawCards(1);
  }

  //player 0 = draw card for both player 
  drawCards(numberCards,player=0){
    for (let index = 0; index < numberCards; index++) {
      if(player == 1 || player == 0 ){
        this.drawSide(1)
      }
      if(player == 2 || player == 0 ){
        this.drawSide(2)
      }
    }
  }
  drawSide(side){
    let tempCard = this['deck'+side].slice(-1)[0]
    if(tempCard && tempCard.length > 0 ){
      this['deck'+side].pop()
      this.addStatus(tempCard, 'onHand')
      //Get zindex from previous card in the hand
      let previousCardZIndex = this.cards[ this['hand'+side].slice(-1)[0] ]?.zindex
      if(previousCardZIndex != undefined){
        this.cards[tempCard].zindex = previousCardZIndex+1;
      }
      this['hand'+side].push(tempCard)
    }
  }
  
  shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
  nextPlayerTurn(){
    //check if all have passed => prevent player movement by setting to 0
    if(this.allHavePassed()){
      this.playerTurn = 0
      return;
    }
    switch (this.playerTurn) {
      case 1:
        if(this.passed2){
          this.playerTurn = 1;
        }else{
          this.playerTurn = 2;
        }
        break;
      case 2:
        if(this.passed1){
          this.playerTurn = 2;
        }else{
          this.playerTurn = 1;
        }
        break;
      case 0:
        let  even  = this.round % 2
        if(this.startingPlayer == 1){
          if(even == 0 ){
            this.playerTurn = 2
          }
          if(even == 1 ){
            this.playerTurn = 1
          }
        }
        if(this.startingPlayer == 2){
          if(even == 0 ){
            this.playerTurn = 1
          }
          if(even == 1 ){
            this.playerTurn = 2
          }
        }
        break;
      default:

      break;
    }
    
  }
  allHavePassed(){
    if(this.passed1 == true && this.passed2 == true){
      return true;
    }
    return false;
  }

  score(){
    this.score1 = 0;
    let scoreArr1 = this.fields.filter((element)=>{ return element.side == 1 });
    scoreArr1.forEach((line)=>{
      line.cards.forEach((idCard)=>{
        this.score1 += this.cards[idCard].power;
      })
    })
    this.score2 = 0;
    let scoreArr2 = this.fields.filter((element)=>{ return element.side == 2 });
    scoreArr2.forEach((line)=>{
      line.cards.forEach((idCard)=>{
        this.score2 += this.cards[idCard].power;
      })
    })
  }
  
  getWinner(){
    return this.score1 > this.score2 ? 1 :
           this.score2 > this.score1 ? 2 : 0 ;  
  }
  getCardAbilitie(idCard,abilitie){
   return this.cards[idCard].abilities[abilitie]
  }
  
  loseLife(player){
    if(player != 1 && player != 2){
      this['life1'] -= 1
      this['life2'] -= 1
      return;
    };
    this['life'+player] -= 1
    
  }
  checkIfDead(){
    if(this.life1 == 0){
      return 1
    }
    if(this.life2 == 0){
      return 2
    }
    return 0
  }
  addCard(boardElement,idCard,row,position = this.fields.length){
    if(boardElement == 'fields'){
      this.cards[idCard].zindex = row+1;
      this.fields[row].cards.splice(position,0, idCard);
    }else{
      this[boardElement].splice(position,0, idCard)
    }
  }
  setWeather(value){
    switch (value) {
      case 'infantry':
        this.fields[2].frozen = true;
        this.fields[3].frozen = true;
        break;
      case 'ranged':
        this.fields[1].frozen = true;
        this.fields[4].frozen = true;
        break;
      case 'siege':
        this.fields[0].frozen = true;
        this.fields[5].frozen = true;
        break;
      case 'sun':
        this.fields.forEach((line,index)=>{
          console.log("line, index : ",line, index)
          this.fields[index].frozen = false;
        })
      default:
        break;
    }
  }
  setPlayerPassed(player){
      this['passed'+player] = true;
  }
  // Calculate Power of all card on the field
  calculatePowerField(){
    console.log("calculatePower");
    this.fields.forEach((line)=>{
      let pairBoosted = {}
      let cardsBoostByBound = []
      line.cards.forEach((cardId)=>{
        this.cards[cardId].power = this.cards[cardId].basePower
        if(line.frozen){
            this.cards[cardId].power = Math.min(1 , this.cards[cardId].power);
        }
        if(line.buff){
          this.cards[cardId].power == this.cards[cardId].power*2
        }
        
        
        if(this.cards[cardId].abilities.bond != undefined){
          cardsBoostByBound.push(cardId)
          if(this.cards[cardId].folderName in  pairBoosted){
            pairBoosted[this.cards[cardId].folderName] = pairBoosted[this.cards[cardId].folderName] +1
          }else{
            pairBoosted[this.cards[cardId].folderName] = 1
          }
          
        }
        
      })
      cardsBoostByBound.forEach((el)=>{
        console.log("pairBoosted.hasOwnProperty(this.cards[el].folderName",pairBoosted.hasOwnProperty(this.cards[el].folderName))
        if(pairBoosted.hasOwnProperty(this.cards[el].folderName)){
          this.cards[el].power = this.cards[el].power*pairBoosted[this.cards[el].folderName]
        }
      })
    })
  }
  scorching(powerMnimum){
    let maxPowerSave = 0;
    let cardsToRemove = []
    this.fields.forEach((line)=>{
      line.cards.forEach((cardId)=>{
        if( this.cards[cardId].power == maxPowerSave ){
          cardsToRemove.push(cardId)
        }
        if( this.cards[cardId].power > maxPowerSave ){
          maxPowerSave = this.cards[cardId].power;
          cardsToRemove = [cardId]
        }
      })
    })
    return cardsToRemove;
  }
  addStatus(idCard, status){
    // console.log("idCard : : ",idCard);
    // console.log("this.cards[idCard] : ",this.cards[idCard]);
    this.cards[idCard].status == status
    if(this.cards[idCard] != undefined){
      if(this.cards[idCard]?.status != undefined){
          if(this.cards[idCard].status.indexOf(status) === -1){
            this.cards[idCard].status.push(status)
          }
      }else{
        this.cards[idCard].status = [status]
      }
    }
  }
  removeStatus(idCard, status){
    if(this.cards[idCard] != undefined){
      let indexOf = this.cards[idCard].status.indexOf(status)
      
      if(indexOf != -1){
        this.cards[idCard].status.splice(indexOf,1)
      }
    }
  }
  removeAllStatus(idCard){
    if(this.cards[idCard] != undefined || this.cards[idCard] != []){
        this.cards[idCard].status = []
    }
  }
  resetZindex(idCard){
    this.cards[idCard].zindex = 10;
  }
  removeCard(boardElement,row,position){
    if(boardElement == 'fields'){
      let cardId = this[boardElement][row].cards.splice(position, 1);
      this.removeStatus(cardId, 'onField')
    }else{
      switch(boardElement) {
        case 'hand1':
        case 'hand2':
          let cardId = this[boardElement].splice(position, 1)
          this.removeStatus(cardId, 'onHand')
          break;
        default:
          this[boardElement].splice(position, 1)
      }
    }
  }
  addToGraveyard(cardId , player){
    console.log("addToGraveyard",this["graveyard"+player])
    this["graveyard"+player].push(cardId)
    this.removeAllStatus(cardId);
    this.resetZindex(cardId)
  }

  emptyField(){
    this.fields.forEach((line,index)=>{
      let newGrave = this.fields[index].cards.splice(0, this.fields[index].cards.length);
      this.fields[index].frozen = false;
      if(index <= 2){
        this.graveyard2 = [...this.graveyard2, ...newGrave]
      }else{
        this.graveyard1 = [...this.graveyard1, ...newGrave]
      }
    })
    //remove all status from card in graveyard
    this.graveyard1.forEach(idCard => {
      this.removeAllStatus(idCard)
    });
    this.graveyard2.forEach(idCard => {
      this.removeAllStatus(idCard)
    });
  }

  //Return Value exemple {boardElement:"fields",row:2, position:9}
  findCard(idCard){
    // console.log("deck1",this.deck1);
    // console.log("fields",this.fields);
    let foundIn = undefined;
    //Search through Fields array
    this.fields.forEach((line,index)=>{
      line.cards.forEach((cardId,indexCard)=>{
        if(cardId == idCard){
          console.log("card found in fields")
          foundIn = {}
          foundIn.boardElement = "fields";
          foundIn.row = index
          foundIn.position = indexCard
        }
      })
    })
    //Search through all other places a card can be found
    let allElement = ['deck1','deck2','hand1','hand2','graveyard1','graveyard2']
    allElement.forEach((element)=>{
      this[element].forEach((cardId,index)=>{
        if(cardId == idCard){
          foundIn = {}
          console.log("card found in "+ element)
          foundIn.boardElement =  element;
          foundIn.position = index
        }
      })
    })
    return foundIn;
  }

}

module.exports = Board;