<template>
  <div class="plan" @contextmenu="handler($event)" >
    
    <PopupCard></PopupCard>
    <router-view></router-view>
    
  </div>
</template>
<script lang="ts">
import io from "socket.io-client";
import PopupCard from "@/components/popupCard.vue";
import { mapActions, mapState, mapMutations} from 'vuex'
import {START_LOADING, STOP_LOADING} from "./store/modules/app/actions";
import { ADD_PLACEHOLDER_TO_FIELD } from "./store/modules/board/mutations";

  export default {
    data() {
      return {
        socket: {},
        totalPlayers : 0,
      };
    },
    components:{
      PopupCard
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
      }),
      ...mapState('board',{
        fields: state => state.fields
      })
    },
    methods:{
      ...mapActions('app', [
        START_LOADING,
        STOP_LOADING
      ]),
      ...mapMutations('board',[
        ADD_PLACEHOLDER_TO_FIELD
      ]),
      handler(e){
         e.preventDefault();
      }
    },
    updated: function(){
      // console.log("APP PROPS updated",this.totalPlayers)
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