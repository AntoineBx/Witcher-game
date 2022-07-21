<template>
  <div class="life">
    <div class="ruby-empty">
      <img src="@/assets/board/profil/ruby-disabled-low.png"/>
      <img src="@/assets/board/profil/ruby-disabled-low.png"/>
    </div>
    <div class="ruby-active">
      <img class="ruby" src="@/assets/board/profil/ruby-active-low.png"/>
      <img class="ruby" src="@/assets/board/profil/ruby-active-low.png"/>
    </div>
        
  </div>
</template>

<script>
import { mapGetters,mapState, mapMutations } from 'vuex'

export default {
  props: {
    player : undefined,
    hidden : false,
  },
  computed:{
    ...mapState('board',{
        life(state){
          return state.lifes[this.player]
        },
        
    }),
  },
  watch:{
    life:function(){
      console.log("life has changed")
    }
  },
  methods:{
    
  }
}
</script>

<style>

</style>