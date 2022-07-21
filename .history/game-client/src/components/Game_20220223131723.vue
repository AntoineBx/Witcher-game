<template>
  <div class="game">
      <MenuParameter/>
    <div class="form-container">
        <div class="gold-frame">
        <input ref="nameInput" placeholder="Username" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
        </div>
            <button @click="validateWaitingList">Find game</button>
        
        Player connected: 
        {{ totalPlayers }}
    </div>
    <Waiting/>
    <Loader/>
    <Board v-show="!hiddenBoard" />
  </div>
</template>

<script>
import Board from "@/components/Board/Board.vue";
import DecksList from "@/decks.json";
import { USER_UPDATE_BOARD,USER_UPDATE_SHOWCASE } from "@/store/modules/board/actions";
import { SET_PLAYER, INIT_ALL_CARDS, UPDATE_PLAYER_TURN, UPDATE_LIFE, UPDATE_CARD_PICKER } from "@/store/modules/board/mutations";
import { mapActions, mapState, mapMutations} from 'vuex'
import Waiting from "./Waiting.vue";
import MenuParameter from "./MenuParameter.vue";
import Loader from "./loader.vue";

export default {
    components:{
    Board,
    Waiting,
    MenuParameter,
    Loader
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
            UPDATE_LIFE,
            UPDATE_CARD_PICKER
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
        cardPicker:function(data){
            this[UPDATE_CARD_PICKER](data)
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
        color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        width: 300px;
        input{
            padding: 10px 20px;
            border: 1px solid white;
            font-family: 'HalisGR';
            background-color: #00000030;
            color: rgb(223, 223, 223);
            font-size: 20px;
            outline: none;
            &::placeholder {
                color: rgb(182, 182, 182);
            }
            &:focus-visible{

            }
        }
        button{
            font-family: 'HalisGR';
            margin: 20px 0 ;
            width: 100%;
            padding: 20px 30px;
        }
    }
}
    
</style>