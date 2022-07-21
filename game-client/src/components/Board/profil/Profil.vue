<template>
  <div class="profil">
        <div class="player">
          <img class="background" src="@/assets/board/profil/back.png"/>
          <div class="wrapper-pic">

            <img class="border" src="@/assets/board/profil/border.png"/>
            <img class="pic" src="@/assets/board/profil/profil_pic.jpg"/>
          </div>
          <div class="info">
            <div class="name"> {{ username1 }} </div>
            <Life :player="player == 1 ? 2 : 1" />
          </div>
        </div>
        <div class="weather">
          <img src="@/assets/board/weather-holder.jpg"/>
        </div>
        <div class="player">
           <img class="background" src="@/assets/board/profil/back.png"/>
          <div class="wrapper-pic">
            <img class="border" src="@/assets/board/profil/border.png"/>
            <img class="pic" src="@/assets/board/profil/profil_pic.jpg"/>
          </div>
          <div class="info">
            <div class="name"> {{ username2 }} </div>
            <Life :player="player" />
          </div>
        </div>
  </div>
</template>

<script>
import { mapGetters,mapState, mapMutations } from 'vuex'
import Life from "@/components/Board/profil/Life.vue";
export default {
  components: { Life }, 
  data: function (){
            return{
              username1 : "",
              username2 : ""
            }
  },
  computed:{
    ...mapState('board',{
        player: state => state.player,
    }),
  },
  watch: {
    '$store.state.board.usernames': {
        deep:true,
        handler(state){
          if(this.$store.state.board.player == 1){
              this.username1 =  state[2];
              this.username2 =  state[1];
          }else{
            this.username1 =  state[1];
            this.username2 =  state[2];
          }
        }
    },
  }
}
</script>

<style lang="scss">
.profil{
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  padding: 20px;
  .player{
    position: relative;
    display:flex;
    .wrapper-pic{
      position: relative;
      margin: 15px;
      .border{
        position: absolute;
        top: -67%;
        left: -67%;
      }
      .pic{

      }
    }
    .info{
      padding: 15px 33px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: white;
      
    }
    img.background{
      width: 600px;
      position: absolute;
      right: -25px;
      top: -26px;
      z-index: -1;
    }
  }
  .weather{
    display: block;
    position: relative;
    height: 190px;
    background-color: black;
    img{
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>