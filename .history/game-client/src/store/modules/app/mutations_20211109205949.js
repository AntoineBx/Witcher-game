export const SET_LOADING = "SET_LOADING"
export const SET_LOADING_MESSAGE = "SET_LOADING_MESSAGE"
export const SET_PLAYER = "SET_PLAYER"
SET_PLAYER
export default {

    [SET_LOADING](state, value) {
        state.loader.loading = value
    },

    [SET_LOADING_MESSAGE](state, value) {
        state.loader.message = value
    },
    [SET_PLAYER](state, value) {
        state.player = value
    },
}