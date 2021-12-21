<template>
  <div class="plan">
    <!-- <div class="totalPlayer">Total Players : {{totalPlayers}}</div> -->
      
    <router-view></router-view>
    <!-- <Board :socket="socket" /> -->

    <button  class="buttonclick" @click="clickChangeLoading">Click to</button>
    {{loading}}
  </div>
</template>
<script lang="ts">

import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
import Board from "./components/Board/Board.vue";
import {START_LOADING, STOP_LOADING} from "./store/modules/app/actions";

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
    computed: {
      ...mapState('app',{
        loading: state => state.loader.loading
      })
    },
    methods:{
      ...mapActions('app', [
        START_LOADING,
        STOP_LOADING
      ]),
      clickChangeLoading(){
        this[START_LOADING]('Loading sounds...')
      }
    },
    updated: function(){
      console.log("APP PROPS updated",this.totalPlayers)
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
.buttonclick{
  transform: translate(10px);
}
.totalPlayer{
  position: absolute;
  bottom: 10px;
  color: white;
}



</style>