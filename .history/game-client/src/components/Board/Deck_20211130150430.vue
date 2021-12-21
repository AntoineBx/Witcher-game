<template>
  <div class="deck">
      <Card v-for="cards in deck" :key="cards" :cardProps="cards" :cardName="cards.folderName" :hidden="hidden"/>
  </div>
</template>

<script>
import Card from "./Card.vue";
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