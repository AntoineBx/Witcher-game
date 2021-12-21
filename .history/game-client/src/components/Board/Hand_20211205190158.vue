<template>
  <div class="hand" :class="player == ">
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
          return state.hands[this.player]
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
    .card-placeholder{
    }
  }
</style>