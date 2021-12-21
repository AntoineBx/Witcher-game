<template>
  <div class="cardsStack">
      <Card v-for="card in cards" :key="card" :cardProps="card" :cardName="card.folderName" :hidden="card.hidden"/>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { mapState, mapMutations , mapActions } from 'vuex'
import { SET_CARD_HIDDEN } from "@/store/modules/board/mutations";

export default {
  components: { Card },
  computed: {
    ...mapState('board',{
      cards : function(state) {
        return state.cardsState
      }
    })
  },
  methods: {
    ...mapMutations('board',[
          SET_CARD_HIDDEN,
    ])
  }
}
</script>

<style lang="scss">
.cardsStack{
    .placeholder{
        position: absolute;
    }
}
</style>