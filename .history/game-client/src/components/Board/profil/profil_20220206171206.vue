<template>
  <div class="profil">
        <div class="player">
          <img class="background" src="@/assets/board/profil/back.jpg"/>
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
          console.log(state[1])
          if(state.player == 1){
              this.username1 =  state[1];
              this.username2 =  state[2];
          }else{
            this.username1 =  state[2];
            this.username2 =  state[1];
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
    position: relative;
    display:flex;
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
    .background{
      position: absolute;
      right: -25px;
      top: -50px;
      z-index: -1;
    }
  }
}
</style>