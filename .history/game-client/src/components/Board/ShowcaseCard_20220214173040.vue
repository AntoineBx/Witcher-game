<template>
  <div class="showcase-card">
      <Placeholder v-if="showcase != undefined" :syncPlaceholders="syncPlaceholders" :key="showcase" :idCard="showcase" :hidden="false" />
  </div>
</template>

<script>
import Placeholder from "@/components/Board/cardPlaceholder/Placeholder.vue"
import { mapState, mapMutations , mapActions } from 'vuex'

export default {
    components: { Placeholder },
    data: function (){
      return{
        syncPlaceholders : 0
      }
    },
    props: {
    },
    computed: {
      ...mapState('board',{
        showcase : function(state) {
          this.syncPlaceholders++
          return state.showcase
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
  .showcase-card{
    width : calc(var(--cardWidth)* 1.6);
    height : calc(var(--cardHeight) * 1.6);
    .card-placeholder{
      position: absolute;
    }
  }
</style>