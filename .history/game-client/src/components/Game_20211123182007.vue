<template>
  <div class="game">
    <label value="Name">Nom de l'invité </label>
    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
    <button @click="validateWaitingList">Find game</button>
    {{ totalPlayers }}
    <Waiting/>
    <Board :hidden="hiddenBoard" />
  </div>
</template>

<script>
import Board from "@/components/Board/Board.vue";
import DecksList from "@/decks.json";
import { USER_UPDATE_BOARD } from "@/store/modules/board/actions";
import { CHANGE_PLAYER_POSITION } from "@/store/modules/board/mutations";
import { mapActions, mapState, mapMutations} from 'vuex'
import Waiting from "./Waiting.vue";

export default {
    components:{
    Board,
    Waiting
},
    data() {
        return {
            playerName: "",
            totalPlayers : 0,
            JsonDecks: DecksList,
            deck : [],
            hiddenBoard : true,
        };
    },
    methods: {
        ...mapMutations('board',[
            CHANGE_PLAYER_POSITION
        ]),
        ...mapActions('board', [
            USER_UPDATE_BOARD
        ]),
        validateWaitingList() {
            console.log( this.$socket)
            if (this.playerName != "") {
                this.$socket.emit("joinGame", {
                    username: this.playerName,
                    deck : this.deck
                });
            }
        },
        SetDeckData(){
            let res = Math.floor(Math.random() * this.JsonDecks.decks.length)
            this.deck = this.JsonDecks.decks[res]
        }
    },
    sockets: {
        totalPlayers: function (data) {
           this.totalPlayers = data
        },
        playerPosition : function(data){
            this[CHANGE_PLAYER_POSITION]({position : data})
        },
        BoardUpdate:function(board){
            console.log("boardUpdateHook");
            this[USER_UPDATE_BOARD](board)
        },
        start : function(){
            this.hiddenBoard = false
            console.log("start")
        },
        boardUpdate : function(){
            
        }
    },
    created(){
        this.SetDeckData()
    },

}
</script>

<style>

</style>