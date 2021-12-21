<template>
  <div class="plan">
    <div class="totalPlayer">Total Players : {{totalPlayers}}</div>
    <Board :socket="socket" />
  </div>
</template>
<script lang="ts">
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
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
    computed :{
      ...mapState('app', [
                'loading',
      ]),
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

#app{
  position: absolute;
    height: 100%;
    width: 100%;
}
.plan{
  position: absolute;
  height: 100%;
  width: 100%;
   perspective: 1000px;
   transform-style: preserve-3d;
}
.totalPlayer{
  position: absolute;
  bottom: 10px;
  color: white;
}



</style>