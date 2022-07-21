<template>
  <div class="plan" @contextmenu="handler($event)" >
    <CardPicker />
    <PopupCard></PopupCard>
    
    <router-view></router-view>
    
    
  </div>
</template>
<script lang="ts">
import io from "socket.io-client";
import PopupCard from "@/components/popupCard.vue";
import { mapActions, mapState, mapMutations} from 'vuex'
import {START_LOADING, STOP_LOADING} from "./store/modules/app/actions";
import CardPicker from "@/components/Board/cardPicker.vue";
  export default {
    data() {
      return {
        socket: {},
      };
    },
    components:{
    PopupCard,
    CardPicker
},
    created() {
     
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
      handler(e){
        e.preventDefault();
      }
    },
    updated: function(){
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