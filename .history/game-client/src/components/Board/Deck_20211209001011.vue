<template>
  <div class="deck">
      <Placeholder v-for="idCard in deck" :key="idCard" :idCard="idCard" :hidden="hidden" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/Placeholder.vue"
import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Placeholder },
    props: {
      player : undefined,
      hidden : Boolean,
    },
    computed: {
      ...mapState('board',{
        deck : function(state) {
          console.log("DeckUpdate");
          return state.decks[this.player]
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
  .deck{
    .card-placeholder{
      position: absolute;
    }
  }
</style>