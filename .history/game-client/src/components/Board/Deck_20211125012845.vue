<template>
  <div class="deck">
      <Card v-for="cards in deck" :key="cards" :cardProps="cards" :cardName="cards.folderName" />
  </div>
</template>

<script>
import Card from "./Card.vue";
import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Card },
    props: {
      player : undefined
    },
    
    computed: {
      ...mapState('board',{
        deck : state => {
          console.log(this.player)
          return state.decks[this.player]
        }
      })
    },
    methods: {
      // ...mapActions('board',[
      //   USER_ADD_CARD_TO_FIELD
      // ]),
      // ...mapMutations('board',[
      //     ADD_CARD_TO_FIELD,
      // ]),
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