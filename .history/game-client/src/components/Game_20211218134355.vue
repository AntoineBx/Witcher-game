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
import { USER_UPDATE_BOARD,USER_UPDATE_SHOWCASE } from "@/store/modules/board/actions";
import { SET_PLAYER, INIT_ALL_CARDS, UPDATE_PLAYER_TURN } from "@/store/modules/board/mutations";
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
            INIT_ALL_CARDS,
            UPDATE_PLAYER_TURN
        ]),
        ...mapActions('board', [
            USER_UPDATE_BOARD,
            USER_UPDATE_SHOWCASE
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
        
        initAllCards : function(cards){
            this[INIT_ALL_CARDS](cards)
        },
        BoardUpdate:function(board){
            this[USER_UPDATE_BOARD](board)
        },
        playerTurnUpdate:function(playerTurn){
            this[UPDATE_PLAYER_TURN](playerTurn)
        },
        ShowcaseCard:function({idCard}){
           this[USER_UPDATE_SHOWCASE](idCard)
        },
        start : function(){
            this.hiddenBoard = false
            console.log("start")
        },
        nextPlayerTurn:function({nextPlayerTurn}){
           this[UPDATE_PLAYER_TURN](idCard)
        },
        
        
    },
    created(){
        this.SetDeckData( Math.floor(Math.random() * this.JsonDecks.decks.length ) )
    },

}
</script>

<style>

</style>