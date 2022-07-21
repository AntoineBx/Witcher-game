export const INIT_ALL_CARDS = "INIT_ALL_CARDS"
export const UPDATE_BOARD = "UPDATE_BOARD"
export const UPDATE_LIFE = "UPDATE_LIFE"
export const UPDATE_CARDS = "UPDATE_CARDS"
export const UPDATE_SHOWCASE = "UPDATE_SHOWCASE"
export const UPDATE_PLAYER_TURN = "UPDATE_PLAYER_TURN"
export const SET_ZINDEX = "SET_ZINDEX"
export const ADD_CARD_TO_FIELD = "ADD_CARD_TO_FIELD"
export const REMOVE_CARD_TO_FIELD = "REMOVE_CARD_TO_FIELD"

export const UPDATE_CARD_STATE_COORD = "UPDATE_CARD_STATE_COORD"
export const REMOVE_CARD_STATE = "REMOVE_CARD_STATE"

export const UPDATE_CARD_PICKER = "UPDATE_CARD_PICKER"
export const CARD_PICKER_CLOSE = "CARD_PICKER_CLOSE"

export const ADD_CARD_STATUS = "ADD_CARD_STATUS"
export const REMOVE_CARD_STATUS = "REMOVE_CARD_STATUS"


export const SET_CARD_HIDDEN = "SET_CARD_HIDDEN"
export const SET_PLAYER = "SET_PLAYER"
export const SET_HOLDING = "SET_HOLDING"
export const SET_MOUSE_POS_ON_RELEASE = "SET_MOUSE_POS_ON_RELEASE"
export const SET_WAS_HOLDING = "SET_WAS_HOLDING"

export default {
    [INIT_ALL_CARDS](state,cards){
        state.cardsState = cards
    },
    [UPDATE_BOARD](state,{board}){
        // console.log("UPDATE BOARD");
        // console.log("board.hand1",board.hand1);
        // console.log("board.hand2",board.hand2);
        state.fields = board.fields;
        state.hands[1] = board.hand1;
        state.hands[2] = board.hand2;
        state.decks[1] = board.deck1;
        state.decks[2] = board.deck2;
        state.usernames[1] = board.username1;
        state.usernames[2] = board.username2;
        state.graveyards[1] = board.graveyard1;
        state.graveyards[2] = board.graveyard2; 
        state.scores[1] = board.score1;
        state.scores[2] = board.score2;
        state.passed1 = board.passed1;
        state.passed2 = board.passed2;
        state.round = board.round;
        state.showcase = undefined;
        state.triggerFields++;
    },
    [UPDATE_LIFE](state,{life1,life2}){
        state.lifes[1] = life1
        state.lifes[2] = life2
    },
    [UPDATE_CARDS](state,{cards}){
        Object.keys(cards).forEach(cardId => {
            if(state.cardsState[cardId] != undefined){
                // Card found => Update each element in it rather than replacing the entire array (to allow Vue responsiveness on these datas)
                Object.keys(cards[cardId]).forEach(element => {
                    state.cardsState[cardId][element] = cards[cardId][element]
                });
            }else{
                // Card not found in the state => Add it
                 state.cardsState[cardId] = cards[cardId]
            }
        });
        state.cardsState
    },
    [UPDATE_CARD_PICKER](state,{cards,fromWhere,toWhere,numberOfCards}){
        console.log("UPDATE CARD PICKER", cards);
        state.cardPicker.cards = cards;
        state.cardPicker.fromWhere = fromWhere;
        state.cardPicker.toWhere = toWhere;
        state.cardPicker.numberOfCards = numberOfCards;
        state.cardPickerToggle = true;
    },
    [CARD_PICKER_CLOSE](state){
        state.cardPickerToggle = false;
    },
    [UPDATE_SHOWCASE](state,idcard){
        state.showcase = idcard;
    },
    [UPDATE_PLAYER_TURN](state,playerTurn){
        state.playerTurn = playerTurn;
    },
    [SET_ZINDEX](state,{idCard,zindex}){
        if(state.cardsState[idCard] != undefined){
            state.cardsState[idCard].zindex = zindex
            state.triggercardsState++
        }
    },
    [ADD_CARD_TO_FIELD](state,{row,position,idCard}){
        state.fields[row].cards.splice(position,0,idCard)
        state.triggerFields++;
    },
    [REMOVE_CARD_TO_FIELD](state,{row,position}) {
        // if (position > -1) {
        //     state.fields[row].cards.splice(position, 1);
        // }
        // state.triggerFields++;
    },
    //SET the placeholder coord in the state to sync with card coord
    [UPDATE_CARD_STATE_COORD](state,{idCard,coord}){
        // console.log("idCARD UPDATE_CARD_STATE_COORD : ",idCard);
        if(idCard == undefined){ console.error('[UPDATE_CARD_STATE_COORD] idCard is undefined ! '); return}
        let xx = coord.x;
        let yy = coord.y;
        if(state.cardsState[idCard] != undefined ){
            state.cardsState[idCard].coord = { x:xx , y:yy }
        }else{
            console.error('[UPDATE_CARD_STATE_COORD] : state.cardsState[idCard] is undefined')
        }
        
        state.triggercardsState++;
    },
    [REMOVE_CARD_STATE](state,idCard) {
        delete state.cardsState[idCard]
    },
    [ADD_CARD_STATUS](state,{idCard,status}){
        if(state.cardsState[idCard] != undefined){
            if(state.cardsState[idCard]?.status != undefined){
                if(state.cardsState[idCard].status.indexOf(status) === -1){
                    state.cardsState[idCard].status.push(status)
                }
            }else{
                state.cardsState[idCard].status = [status]
            }
        }
    },
    [REMOVE_CARD_STATUS](state,{idCard,status}){

    },
    [SET_CARD_HIDDEN]( state , {idCard, value}){
        if(state.cardsState[idCard] != undefined){
            state.cardsState[idCard].hidden = value
        }
        
    },
    [SET_PLAYER](state, value) {
        state.player = value
        state.triggerFields++;
    },
    [SET_HOLDING](state, {uuid,positioning,abilities}) {
        state.holdingCard = uuid;
        state.wasHolding = uuid;
        state.currentCardData.positioning = positioning;
        state.currentCardData.abilities = abilities;
    },
    [SET_WAS_HOLDING](state,uuid) {
        state.wasHolding = uuid;
    },
    [SET_MOUSE_POS_ON_RELEASE](state, {x,y}) {
        state.mousePosOnRelease = {x,y};
    },
    
}