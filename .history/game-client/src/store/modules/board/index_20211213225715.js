import actions from "./actions";
import mutations from "./mutations";

const state = {
    player: 1,
    playerTurn:0,// init to 0 so that no one can move (player 1 or 2)
    round:1,

    holdingCard : undefined,
    wasHolding : undefined,
    mousePosOnRelease : undefined,
    currentCardData : {
        positioning : undefined
    },
    
    decks : {
        [1] : [],
        [2] : []
    },
    hands : {
        [1] : [],
        [2] : []
    },
    showcase : undefined,
    fields :[
        {type : "siege",side : 2, cards : []},
        {type : "ranged",side : 2, cards : []},
        {type : "infantry",side : 2, cards : []},
        {type : "infantry",side : 1, cards : []},
        {type : "ranged",side : 1, cards : []},
        {type : "siege",side : 1, cards : []},
    ],
    triggerFields:0,
    cardsState:{},
    triggercardsState:0,
}

const getters = {
    mousePosOnReleaseState: state => {
        return state.mousePosOnRelease;
    },
    cardsCoordState: state => {
        return state.cardsState;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}