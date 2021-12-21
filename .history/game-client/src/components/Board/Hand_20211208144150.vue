<template>
  <div class="hand" :class=" player != playerState ? 'opponent' : '' " >
      <Placeholder v-for="idCard in hand" :key="idCard" :idCard="idCard" :hidden="hidden" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/Placeholder.vue"
import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Placeholder },
    props: {
      player : undefined,
      hidden : false,
    },
    computed: {
      ...mapState('board',{
        hand : function(state) {
          return state.hands[this.player].slice().reverse()
        },
        playerState: state => state.player
      })
    },
    methods: {
     
    },
    mounted : function(){
      console.log(this.player);
    }
}
</script>

<style lang="scss">
  .hand{
    pointer-events: none;
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    position: absolute;
    left:50%;
    bottom: 50px;
    transform: translateX(-50%);
    z-index: 1;
    transition: top 0.5s,bottom 0.5s;
    &.player{
        // bottom: -40px;
    }
    &.opponent{
        top: -140px;
    }
    .card-placeholder{
      
    }
  }
</style>