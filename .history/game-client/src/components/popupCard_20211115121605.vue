<template>
  <div class="popup" v-show="">

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