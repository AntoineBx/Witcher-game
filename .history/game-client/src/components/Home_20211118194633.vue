<template>
    <div>HOME<hr>
        <label value="Name">Nom de l'invité </label>
        <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
        <button @click="validateWaitingList">Find game</button>
        <Board/>
    </div>
</template>
    
<script>
import io from "socket.io-client";
import Board from "@/components/Board/Board.vue";

export default {
    data() {
      return {
        playerName : "",
        inQueue : "",
      }
    },
    components:{
        Board
    },
    methods:{
        validateWaitingList(){
            if(this.playerName != ""){
                this.$socket.emit("joinGame",{
                    username:this.playerName,
                    img: "balec",
                    maxPlayers: 2
                });
            }
        }
    }
}
</script>

<style>

</style>