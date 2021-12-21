export const SET_LOADING = "SET_LOADING"
export const SET_LOADING_MESSAGE = "SET_LOADING_MESSAGE"

export default {

 
    [OPEN_POPUP](state, cardName) {
        state.open = true;
        state.card = cardName
    },
    
}