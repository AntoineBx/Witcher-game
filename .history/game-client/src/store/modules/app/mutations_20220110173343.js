export const SET_LOADING = "SET_LOADING"
export const SET_LOADING_MESSAGE = "SET_LOADING_MESSAGE"

export default {

    [SET_LOADING](state, value) {
        state.loader.loading = value
    },

    [SET_LOADING_MESSAGE](state, value) {
        state.loader.message = value
    },
    [SET_MUSIC](state, value) {
        state.music = value
    },
    [SET_VIDEO_AUTO_PLAY](state, value) {
        state.videoAutoPlay = value
    },
    
}