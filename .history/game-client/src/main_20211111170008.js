
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter , createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './components/Home.vue'
import io from "socket.io-client";

import VueSocketIO from 'vue-3-socket.io'

//Store Module import
import app from './store/modules/app'
import board from './store/modules/board'




//VUE ROUTER
const router = createRouter({
    history : createWebHistory(),
    routes: [
        {
            path : '/', 
            name : 'Home', 
            component : Home
        }
    ]
})

const appli = createApp(App)
//VUEX
const store = createStore({
    modules: {
        app,
        board
    }
})
const socketInstance = io("http://localhost:5000", {
  transports: ['websocket'],
});

appli.use(store).use(router).use(
    new VueSocketIO({
        debug: false,
        connection: socketInstance,
        transports: ['websocket']
    })
)
appli.mount('#app')