<template>
  <div class="popup" v-show="open">
    <div class="inner-popup">
      LALALALAL

    </div>
  </div>
</template>

<script>
import CardsList from "@/cards.json";


export default {
    computed: {
      ...mapState('popupCard',{
          open,
          card
      })
    },

}
</script>

<style>

</style>