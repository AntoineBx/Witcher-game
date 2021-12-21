<template>
  <div class="showcase-card">
      <Placeholder v-for="idCard in showcase" :isDeck="true" :syncPlaceholders="syncPlaceholders" :key="idCard" :idCard="idCard" :hidden="false" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/Placeholder.vue"
import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Placeholder },
    data: function (){
      return{
        syncPlaceholders : 0
      }
    },
    props: {
      player : undefined,
      hidden : Boolean,
    },
    computed: {
      ...mapState('board',{
        showcase : function(state) {
          this.syncPlaceholders++
          return state.decks[this.player]
        }
      })
    },
    methods: {
     
    },
    mounted : function(){
    }
}
</script>

<style lang="scss">
  .deck{
    .card-placeholder{
      position: absolute;
    }
  }
</style>