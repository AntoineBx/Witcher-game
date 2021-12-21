<template>
  <div class="deck">
      <Placeholder v-for="idCard in deck" :key="idCard"   :idCard="idCard" :syncPlaceholders="syncPlaceholders"/>
  </div>
</template>

<script>

import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Card },
    props: {
      player : undefined,
      hidden : false
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
    .placeholder{
      position: absolute;
    }
  }
</style>