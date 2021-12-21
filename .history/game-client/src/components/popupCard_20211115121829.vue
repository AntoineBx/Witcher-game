<template>
  <div class="popup" v-show="open">
    <div class="inner-popup">
      LALALALAL

    </div>
  </div>
</template>

<script>
import CardsList from "@/cards.json";
import { mapState, mapMutations } from 'vuex'

export default {
    computed: {
      ...mapState('popupCard',{
          open: state => state.open,
          card: state => state.card,
      })
    },

}
</script>

<style>

</style>