import actions from "./actions";
import mutations from "./mutations";

const state = {
    open : false,
    cardName : "",
}

const getters = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}