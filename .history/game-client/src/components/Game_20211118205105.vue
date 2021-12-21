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
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    components:{
        Board
    },
    data() {
        return {
            playerName: "",
            totalPlayers : 0,
        };
    },
    methods: {
        validateWaitingList() {
            if (this.playerName != "") {
                this.$socket.emit("joinGame", {
                    username: this.playerName,
                    img: "balec",
                    maxPlayers: 2
                });
            }
        }
    },
    created : function(){
        this.$socket.on("connect",()=>{
console.log(" connect")
        })
         console.log(" totalPlayers UPDATE")
        this.$socket.on("totalPlayers",(totalPlayers) => {
            this.totalPlayers = totalPlayers
            console.log(" totalPlayers UPDATE")
        })
    },

}
</script>

<style>

</style>