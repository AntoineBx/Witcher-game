<template>
  <div class="background">
    <div class="totalPlayer">Total Players : {{totalPlayers}}</div>
    <Board :socket="socket" />
  </div>
</template>
<script lang="ts">

import io from "socket.io-client";
import Board from "./components/Board.vue";

  export default {
    data() {
      return {
        socket: {},
        totalPlayers : 0,
      };
    },
    
    components:{
      Board
    },
    created() {
      this.socket = io("http://localhost:5000");
      this.socket.on("totalPlayers", data => (this.totalPlayers = data));
      this.socket.emit("joinGame", {
          username:"MeowMeow",
          img: "https://i.pravatar.cc/150?u=",
          maxPlayers: 3
      });
    },
    mounted: function() {
      
    },
    updated: function(){
      console.log(this.totalPlayers)
    }
  }


</script>


<style lang="scss">
@import "@/assets/scss/main.scss";  


.totalPlayer{
  position: absolute;
  bottom: 10px;
  color: white;
}



</style>