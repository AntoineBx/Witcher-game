import App from '../App.vue'
import Vuex from 'vuex'
import app from './modules/app'


export default new Vuex.Store({
    modules: {
        app
    }
})
