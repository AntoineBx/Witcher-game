<template>
  <div class="cardsStack">
      <Card v-for="card in cards" :key="card" :cardProps="card" :cardName="card.folderName" :hidden="false"/>
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
        console.log("cards   fzfzfz" , state.cardsState)
        return state.cardsState
      }
    })
  },
}
</script>

<style lang="scss">
.cardsStack{
    .placeholder{
        position: absolute;
    }
}
</style>