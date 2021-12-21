<template>
  <div class="deck">
      <Card v-for="cards in deck" :key="cards" />
  </div>
</template>

<script>
import Card from "./Card.vue";
import { mapGetters,mapState, mapMutations } from 'vuex'

export default {
    components: { Card },
    computed:{
      ...mapState('board',{
        deck : state => {
          return state.deck[1]
        }
      })
    },
    methods: {
      ...mapActions('board',[
        USER_ADD_CARD_TO_FIELD
      ]),
      ...mapMutations('board',[
          ADD_CARD_TO_FIELD,
      ]),
    }
}
</script>

<style>

</style>