<template>
  <div class="hand" :class=" player != playerState ? 'opponent' : '' " >
      <Placeholder v-for="idCard in hand" :key="idCard" :idCard="idCard" :hidden="hidden" :syncPlaceholders="syncPlaceholders" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/cardPlaceholder/Placeholder.vue"
import { mapState, mapMutations , mapActions , mapGetters } from 'vuex'

export default {
    components: { Placeholder },
    data(){
        return {
          syncPlaceholders : 0
        }
    },
    props: {
      player : 0,
      hidden : false
    },
    watch: {
      hands: function(newVal,oldVal) {
        this.syncPlaceholders++
      }
    },
    computed: {
      hands() {
        // console.log(this.$store.getters['board/hand'+this.player])
        return this.$store.getters[`board/hand${this.player}`]
      },
      ...mapState('board',{
        hand: function(state){
          return state.hands[this.player].slice();
        },
        playerState: state => state.player
      })
    },
    methods: {
     
    },
    mounted : function(){
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