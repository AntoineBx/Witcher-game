<template>
  <div class="game">
    <label value="Name">Nom de l'invité </label>
    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
    <button @click="validateWaitingList">Find game</button>
    {{ totalPlayers }}
    <Waiting/>
    <Board v-show="!hiddenBoard" />
  </div>
</template>

<script>
import Board from "@/components/Board/Board.vue";
import DecksList from "@/decks.json";
import { USER_UPDATE_BOARD } from "@/store/modules/board/actions";
import { SET_PLAYER, INIT_ALL_CARDS } from "@/store/modules/board/mutations";
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
            SET_PLAYER,
            INIT_ALL_CARDS
        ]),
        ...mapActions('board', [
            USER_UPDATE_BOARD
        ]),
        validateWaitingList() {
           
            if (this.playerName != "") {
                this.$socket.emit("joinGame", {
                    username: this.playerName,
                    deck : this.deck
                });
            }
        },
        SetDeckData(numDeck){
            this.deck = this.JsonDecks.decks[numDeck]
        }
    },
    sockets: {
        totalPlayers: function (data) {
           this.totalPlayers = data
        },
        playerPosition : function(data){
            this[SET_PLAYER](data)
        },
        Test:function(data){
            console.log("TEST RECEIVE THING")
        },
        initAllCards : function(cards){
            console.log("initAllCards",cards)
            
            this[INIT_ALL_CARDS](cards)
        },
        BoardUpdate:function(board){
            console.log("boardUpdateHookSocket");
            this[USER_UPDATE_BOARD](board)
        },
        start : function(){
            this.hiddenBoard = false
            console.log("start")
        },
        
    },
    created(){
        this.SetDeckData( Math.floor(Math.random() * this.JsonDecks.decks.length ) )
    },

}
</script>

<style>

</style>