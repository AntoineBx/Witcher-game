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
  data(){
    return {
       show: false,
    }
  },
  computed: {
    ...mapState('board',{
      cards : function(state) {
        let ret = []
        state.cardPicker.forEach(cardId => {
          ret.push( state.cardsState[cardId] ) 
        });
        console.log("cardViewer return", ret )
        return ret;
      }
    }),
    watch:{
        '$store.state.board.cardPickerToggle': function() {
             this.$store.state.board.cardPickerToggle
        }
    }
  },
  
}
</script>

<style>

</style>