<template>
  <div class="profil">
        <div class="player">
          <div class="wrapper-pic">
            <img class="border" src="@/assets/board/profil/border.png"/>
            <img class="pic" src="@/assets/board/profil/profil_pic.jpg"/>
          </div>
          <div class="info">
            <div class="name"> {{ username1 }} </div>
            <div class="life"></div>
          </div>
        </div>
        <div class="weather">
          
        </div>
        <div class="player">
          <div class="wrapper-pic">
            <img class="border" src="@/assets/board/profil/border.png"/>
            <img class="pic" src="@/assets/board/profil/profil_pic.jpg"/>
          </div>
          <div class="info">
            <div class="name"> {{ username2 }} </div>
            <div class="life"></div>
          </div>
        </div>
  </div>
</template>

<script>
import { mapGetters,mapState, mapMutations } from 'vuex'

export default {

  data: function (){
            return{
              username1 : "",
              username2 : ""
            }
  },
  watch: {
    '$store.state.board.usernames': {
        deep:true,
        handler(state){
          if(state.player == 1){
              username1 =  state[1];
              username2 =  state[2];
          }else{
            username1 =  state[2];
            username2 =  state[1];
          }
        }
    },
  }
}
</script>

<style scoped lang="scss">
.profil{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
  .player{
    .wrapper-pic{
      position: relative;
      .border{
        position: absolute;
        top: -67%;
        left: -67%;
      }
      .pic{

      }
    }
    
  }
}
</style>