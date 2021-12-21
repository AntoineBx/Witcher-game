<template>
  <div class="deck">
      <Card v-for="card in cards" :key="card" />
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
    components: { Card },
    computed:{
      ...mapState('board',{
        
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