<template>
  <div class="background">
    <img  class="backCard" src="@/assets/bck.jpg" draggable="false" ondragstart="return false;" alt="">
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

.background{
  &>img{
    position: absolute;
    top: 50%;left: 50%;
    width: 100%;
    transform: translate(-50%,-50%);
    z-index: -1;
  }
}
.totalPlayer{
  color: white;
}



</style>