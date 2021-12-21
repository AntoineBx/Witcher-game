<template>
  <div class="deck" :class=" opponent ? 'opponent' : '' ">
      <Placeholder v-for="idCard in deck" :isDeck="true" :syncPlaceholders="syncPlaceholders" :key="idCard" :idCard="idCard" :hidden="hidden" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/Placeholder.vue"
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
          return state.graveyard[this.player]
        }
      })
    },
    methods: {
     
    },
    mounted : function(){
      console.log("Graveyard MOUNTED", this.$heightCard)
    }
}
</script>

<style lang="scss">
  .deck{
    background-color: #000;
    width : var(--cardWidth);
    height : var(--cardHeight);
    .card-placeholder{
      position: absolute;
    }
  }
</style>