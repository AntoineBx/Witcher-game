import actions from "./actions";
import mutations from "./mutations";

const state = {
   name : "",
}

const getters = {
    loadingState: state => {
        return state.loader.loading;
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}