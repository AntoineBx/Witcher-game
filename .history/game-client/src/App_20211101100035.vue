<template>
  <div>
    <div class="totalPlayer">Total Players : {{totalPlayers}}</div>
    <Board/>
  </div>
</template>
<script lang="ts">

import Card from "@/components/Card.vue"
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
    Card,
    Board
},
    created() {
    this.socket = io("http://localhost:5000");
    this.socket.on("totalPlayers", data => (this.totalPlayers = data));
    this.socket.emit("joinGame", {
        username:"MeowMeow",
        img: "https://i.pravatar.cc/150?u=" ,
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
  color: white;
}
.hand{
  display: flex;
  flex-wrap: nowrap;
  
  justify-content: center;
  margin-top: 100px;
}


</style>