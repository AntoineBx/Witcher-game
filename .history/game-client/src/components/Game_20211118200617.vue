<template>
  <div class="game">
    <label value="Name">Nom de l'invité </label>
    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
    <button @click="validateWaitingList">Find game</button>

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
        };
    },
    methods: {
        validateWaitingList() {
            if (this.playerName != "") {
                console.log("emit")
                this.$socket.emit("joinGame", {
                    username: this.playerName,
                    img: "balec",
                    maxPlayers: 2
                });
            }
        }
    },
    mounted : function(){
        this.$socket.on("totalPlayers",()=>{
            console.log(" totalPlayers UPDATE")
        })
    },

}
</script>

<style>

</style>