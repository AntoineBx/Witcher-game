<template>
  <button class="button-pass" @click="passed" >
      <img class="backgroundBack" src="@/assets/board/jetonBack.png" draggable="false" ondragstart="return false;" alt="">
      <img class="backgroundFaced" src="@/assets/board/jetonFace.png" draggable="false" ondragstart="return false;" alt="">
     <div>
         PASSED
    </div>
</button>
</template>

<script>
import { mapGetters,mapState, mapMutations } from 'vuex'

export default {
    data: function (){
      return{
      }
    },
    computed: {
        ...mapState('board',{
            player: state => state.player,
        }),
    },
    methods: {
        passed :function(){
             this.$socket.emit("passed", this.player);
        }
    },
    
}
</script>

<style lang="scss">

.button-pass{
    position: absolute;
    top: 40%;
    right: 0;
    padding: 40px;
    border-radius: 50%;
    background-color: black;
    &:active{
        border-style: none;
    }
    &>div{
        position: absolute;
        color : white;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    img{
        position: absolute;
        top:0; bottom:0;left:0;right: 0;
        width: 100%;
        height: 100%;
    }
}
</style>