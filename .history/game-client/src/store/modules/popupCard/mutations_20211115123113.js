export const OPEN_POPUP = "OPEN_POPUP"
export const CLOSE_POPUP = "CLOSE_POPUP"

export default {
    [OPEN_POPUP](state, cardName) {
        state.open = true;
        state.card = cardName;
    },
    [CLOSE_POPUP](state) {
        state.open = false;
        state.card = cardName;
    },
    
}