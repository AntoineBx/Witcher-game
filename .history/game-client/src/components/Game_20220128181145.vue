<template>
  <div class="game">
      <MenuParameter/>
    <div class="form-container">
        <input ref="nameInput" placeholder="Username" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
        <button @click="validateWaitingList">Find game</button>
        Player connected: 
        {{ totalPlayers }}
    </div>
    <Waiting/>
    <Board v-show="!hiddenBoard" />
  </div>
</template>

<script>
import Board from "@/components/Board/Board.vue";
import DecksList from "@/decks.json";
import { USER_UPDATE_BOARD,USER_UPDATE_SHOWCASE } from "@/store/modules/board/actions";
import { SET_PLAYER, INIT_ALL_CARDS, UPDATE_PLAYER_TURN, UPDATE_LIFE } from "@/store/modules/board/mutations";
import { mapActions, mapState, mapMutations} from 'vuex'
import Waiting from "./Waiting.vue";
import MenuParameter from "./MenuParameter.vue";

export default {
    components:{
    Board,
    Waiting,
    MenuParameter
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
            UPDATE_PLAYER_TURN,
            UPDATE_LIFE
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
        lifeUpdate:function(lifes){
            this[UPDATE_LIFE](lifes)
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

<style lang="scss">
.game{
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .form-container{
        padding: 20px;
        display: flex;
        flex-direction: column;
        width: 300px;
        input{
            padding: 10px 20px;
            border: 1px solid white;
            background-color: transparent;
            color: rgb(223, 223, 223);
            outline: none;
            &::placeholder {
                color: rgb(182, 182, 182);
                font-family: 'GWENT';
            }
            &:focus-visible{

            }
        }
    }
}
    
</style>