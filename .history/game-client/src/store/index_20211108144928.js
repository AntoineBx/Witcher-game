
import Vuex from 'vuex'

import app from './modules/app'
import board from './modules/board'


export default new Vuex.Store({
    modules: {
        app,
        board
    }
})
