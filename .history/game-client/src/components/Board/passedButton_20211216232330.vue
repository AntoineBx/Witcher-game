<template>
  <button class="button-pass" @click="passed">
      <img class="backgroundBack" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
      <img class="backgroundFaced" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
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
    padding: 40px 20px;
    border-radius: 50%;
    img{
        position: absolute;
    }
}
</style>