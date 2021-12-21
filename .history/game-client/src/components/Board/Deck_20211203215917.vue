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
    },
    computed: {
      ...mapState('board',{
        deck : function(state) {
          return state.decks[this.player]
        }
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
  .deck{
    .card-placeholder{
      position: absolute;
    }
  }
</style>