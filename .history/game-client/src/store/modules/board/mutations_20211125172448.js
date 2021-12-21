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
    [SET_ALL_CARDS](state,{cards}){
        console.log(cards)
        state.cardsState = cards
    },
    [UPDATE_BOARD](state,{board}){
        state.fields = board.fields;
        state.decks[1] = board.deck1;
        state.decks[2] = board.deck2;
        state.triggerFields++;
    },
    [ADD_CARD_TO_FIELD](state,{Row,position,uuid}){
        state.fields[Row].cards.splice(position,0,{ uuid : uuid})
        state.triggerFields++;
    },
    [REMOVE_CARD_TO_FIELD](state,{Row,position}) {
        if (position > -1) {
            state.fields[Row].cards.splice(position, 1);
        }
        state.triggerFields++;
    },
    [UPDATE_CARD_STATE_COORD](state,{uuid,coord}){
        let xx = coord.x;
        let yy = coord.y;
        if(state.cardsState[uuid]?.coord != undefined){
            state.cardsState[uuid].coord = { x:xx , y:yy }
        }else{
            state.cardsState[uuid] = { coord :{ x:xx , y:yy }}
        }
        state.triggercardsState++;
    },
    [REMOVE_CARD_STATE](state,uuid) {
        delete state.cardsState[uuid]
    },
    [ADD_CARD_STATUS](state,{uuid,status}){
        if(state.cardsState[uuid]?.coord != undefined){
            if(state.cardsState[uuid]?.status != undefined){
                if(state.cardsState[uuid].status.indexOf(status) === -1){
                    state.cardsState[uuid].status.push(status)
                }
            }else{
                state.cardsState[uuid].status = [status]
            }
            
            
        }
    },
    [REMOVE_CARD_STATUS](state,{uuid,status}){

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