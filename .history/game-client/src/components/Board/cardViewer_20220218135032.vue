<template>
  <div class="cardsStack">
      <Card v-for="card in cards" :key="card" :cardProps="card" :cardName="card.folderName" :cardPower="card.power" :hidden="card.hidden" />
  </div>
</template>

<script>
import Card from "@/components/Board/Card.vue";
import { mapState, mapMutations , mapActions } from 'vuex'
import { SET_CARD_HIDDEN } from "@/store/modules/board/mutations";

export default {
  components: { Card },
  computed: {
    ...mapState('board',{
      cards : function(state) {
        return state.cardsState
      }
    }),
    watch:{
        // '$store.state.board.triggerFields': function() {
        //     if(this.$store.state.board.player == 2){
        //             console.log("reversed watch")
        //             this.fieldArranged = this.$store.state.board.fields;
        //             this.fieldArranged.reverse()
        //     }else{
        //          this.fieldArranged = this.$store.state.board.fields;
        //     }
        // }
    }
  },
  
}
</script>

<style>

</style>