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
                this.$socket.emit("joinGame", {
                    username: this.playerName,
                    img: "balec",
                    maxPlayers: 2
                });
            }
        }
    },
    mounted : function(){
        
    }
}
</script>

<style>

</style>