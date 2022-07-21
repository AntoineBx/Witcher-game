import actions from "./actions";
import mutations from "./mutations";

const state = {
    player: 1,
    playerTurn:0,// init to 0 so that no one can move (player 1 or 2)
    round:1,
    passed1 : false,
    passed2 : false,
    holdingCard : undefined,
    wasHolding : undefined,
    mousePosOnRelease : undefined,
    currentCardData : {
        positioning : undefined,
        abilities : undefined
    },
    scores: {
        [1] : 0,
        [2] : 0
    },
    lifes: {
        [1] : 2,
        [2] : 2
    },
    usernames: {
        [2] : ""
    },
    decks : {
        [1] : [],
        [2] : []
    },
    hands : {
        [1] : [],
        [2] : []
    },
    graveyards : {
        [1] : [],
        [2] : []
    },
    showcase : undefined,
    fields :[
        { type : "siege", side : 2, cards : [] },
        { type : "ranged", side : 2, cards : [] },
        { type : "infantry", side : 2, cards : [] },
        { type : "infantry", side : 1, cards : [] },
        { type : "ranged", side : 1, cards : [] },
        { type : "siege", side : 1, cards : [] },
    ],
    triggerFields:0,
    cardsState:{},
    triggercardsState:0,
    cardPicker : {
        cards : [],
        fromWhere : '',
        toWhere : '',
        numberOfCards : 1
    },
    cardPickerToggle : false,
}

const getters = {
    opponent: state => {
        if(state.player == 1){
            return 2;
        }else{
            return 1;
        }
    },
    mousePosOnReleaseState: state => {
        return state.mousePosOnRelease;
    },
    cardsCoordState: state => {
        return state.cardsState;
    },
    hand1 : state =>{
        return state.hands[1];
    },
    hand2 : state =>{
        return state.hands[2];
    },
    
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}