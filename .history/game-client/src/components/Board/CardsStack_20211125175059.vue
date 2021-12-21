<template>
  <div class="cardsStack">
      <!-- <Card v-for="card in cards" :key="card" :cardProps="card" :cardName="card.folderName" :hidden="hidden"/> -->
  </div>
</template>

<script>
import Card from "./Card.vue";
import { mapState, mapMutations , mapActions } from 'vuex'

export default {

    components: { Card },
    computed: {
      ...mapState('board',{
        cards : function(state) {
          return state.cardsState
        }
      })
    },
    
}
</script>

<style>

</style>