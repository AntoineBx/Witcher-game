<template>
  <div class="popup" v-show="open">
    <div class="inner-popup">
       <Card  cardName="avallach"/>

    </div>
  </div>
</template>

<script>
import CardsList from "@/cards.json";
import Card from "@/components/Board/Card.vue";
import { mapState, mapMutations } from 'vuex'

export default {
  components: { Card },
  computed: {
    ...mapState('popupCard',{
        open: state => state.open,
        card: state => state.card,
    })
  },

}
</script>

<style lang="scss">

  .popup{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: black;
    z-index: 5;
    justify-content: center;
    align-items: center;
    
    .inner-popup{

    }
  }
</style>