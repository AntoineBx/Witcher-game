export const SET_ALL_CARDS = "SET_ALL_CARDS"
export const UPDATE_BOARD = "UPDATE_BOARD"

export const ADD_CARD_TO_FIELD = "ADD_CARD_TO_FIELD"
export const REMOVE_CARD_TO_FIELD = "REMOVE_CARD_TO_FIELD"

export const UPDATE_CARD_STATE_COORD = "UPDATE_CARD_STATE_COORD"
export const REMOVE_CARD_STATE = "REMOVE_CARD_STATE"

export const ADD_CARD_STATUS = "ADD_CARD_STATUS"
export const REMOVE_CARD_STATUS = "REMOVE_CARD_STATUS"

export const SET_PLAYER = "SET_PLAYER"
export const SET_HOLDING = "SET_HOLDING"
export const SET_MOUSE_POS_ON_RELEASE = "SET_MOUSE_POS_ON_RELEASE"
export const SET_WAS_HOLDING = "SET_WAS_HOLDING"
export default {
    [SET_ALL_CARDS](state,cards){
        console.log("SET_ALL_CARDS",cards)
        state.cardsState = cards
    },
    [UPDATE_BOARD](state,{board}){
        state.fields = board.fields;
        state.decks[1] = board.deck1;
        state.decks[2] = board.deck2;
        state.triggerFields++;
    },
    [ADD_CARD_TO_FIELD](state,{row,position,idCard}){
        state.fields[row].cards.splice(position,0,idCard)
        state.triggerFields++;  
    },
    [REMOVE_CARD_TO_FIELD](state,{row,position}) {
        if (position > -1) {
            state.fields[row].cards.splice(position, 1);
        }
        state.triggerFields++;
    },
    [UPDATE_CARD_STATE_COORD](state,{idCard,coord}){
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
        console.log("[ADD_CARD_STATUS]");
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
    [SET_PLAYER](state, value) {
        state.player = value
        state.triggerFields++;
    },
    [SET_HOLDING](state, {uuid,positioning}) {
        state.holdingCard = uuid;
        state.wasHolding = uuid;
        state.currentCardData.positioning = positioning;
    },
    [SET_WAS_HOLDING](state,uuid) {
        state.wasHolding = uuid;
    },
    [SET_MOUSE_POS_ON_RELEASE](state, {x,y}) {
        state.mousePosOnRelease = {x,y};
    },
    
}