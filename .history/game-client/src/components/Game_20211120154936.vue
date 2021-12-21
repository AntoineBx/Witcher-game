<template>
  <div class="game">
    <label value="Name">Nom de l'invité </label>
    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
    <button @click="validateWaitingList">Find game</button>
    {{ totalPlayers }}
    <Board hidden/>
  </div>
</template>

<script>
import Board from "@/components/Board/Board.vue";
import DecksList from "@/decks.json";
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    components:{
        Board
    },
    data() {
        return {
            playerName: "",
            totalPlayers : 0,
            JsonDecks: DecksList,
            deck : []
        };
    },
    methods: {
        validateWaitingList() {
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
        connect: function () {
            console.log('socket connected')
        },
        totalPlayers: function (data) {
           this.totalPlayers = data
        },
        waiting : function(data){
            console.log("waiting", data)
        },
        start : function(){
            console.log("start")
        },
        
    },
    created(){
        this.SetDeckData()
    },

}
</script>

<style>

</style>