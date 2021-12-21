<template>
  <div class="showcase-card">
      <Placeholder  :syncPlaceholders="syncPlaceholders" :key="showcase" :idCard="showcase" :hidden="false" />
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
      background-color: #FFF;
    width : calc(var(--cardWidth)* 2);
    height : calc(var(--cardHeight) * 2);
    .card-placeholder{
      position: absolute;
    }
  }
</style>