<template>
  <div class="profil">
        <div class="player">
          <div class="wrapper-pic">
            <img class="border" src="@/assets/board/profil/border.png"/>
            <img class="pic" src="@/assets/board/profil/profil_pic.jpg"/>
          </div>
        </div>
        <div class="weather">
          
        </div>
        <div class="player">
          <div class="wrapper-pic">
            <img class="border" src="@/assets/board/profil/border.png"/>
            <img class="pic" src="@/assets/board/profil/profil_pic.jpg"/>
          </div>
        </div>
  </div>
</template>

<script>
export default {

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