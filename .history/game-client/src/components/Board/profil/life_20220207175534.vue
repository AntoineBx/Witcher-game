<template>
  <div class="life">
        <img class="ruby" src="@/assets/board/profil/ruby-active-low.png"/>
        <img class="ruby" src="@/assets/board/profil/ruby-active-low.png"/>
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
        life: state => state.lifes[player],
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