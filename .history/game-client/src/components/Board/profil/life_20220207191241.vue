<template>
  <div class="life">
    <div class="row ruby-disabled">
      <img src="@/assets/board/profil/ruby-disabled-low.png"/>
      <img src="@/assets/board/profil/ruby-disabled-low.png"/>
    </div>
    <div class="row ruby-active" vfor>
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

<style scoped lang="scss">
  .life{
        display: flex;
        position: relative;
        flex-direction: column;
        width: 100px;
        height:40px ;
        .row{
          position: absolute;
          &.ruby-active{
            img{

            }
          }
          &.ruby-disabled{
            img{
              width: 45px;
              padding: 2.5px;
            }
          }
        }
        
  }
</style>