<template>
  <div class="graveyard" :class=" opponent ? 'opponent' : '' ">
      <img class="background" src="@/assets/board/cards-bg.jpg" draggable="false" ondragstart="return false;" alt="">
      <Placeholder v-for="idCard in graveyard" :syncPlaceholders="syncPlaceholders" :key="idCard" :idCard="idCard" :hidden="hidden" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/cardPlaceholder/Placeholder.vue"
import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Placeholder },
    data: function (){
      return{
        syncPlaceholders : 0
      }
    },
    props: {
      player : undefined,
      hidden : Boolean,
      opponent : false,
    },
    computed: {
      ...mapState('board',{
        graveyard : function(state) {
          this.syncPlaceholders++
          return state.graveyards[this.player]
        }
      })
    },
    methods: {
     
    },
    mounted : function(){
    }
}
</script>

<style lang="scss">
  .graveyard{
    position: relative;
    z-index: -1;
    margin: 0 5px;
    background-color: #000;
    width : var(--cardWidth);
    height : var(--cardHeight);
    .background{
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .card-placeholder{
      position: absolute;
    }
  }
</style>