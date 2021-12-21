<template>
  <div class="banner-turn-wrapper" :class=" show ? 'show' : '' ">
      <div class="background" />
      <div class="message">
          YOUR TURN!
      </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    data(){
        return {
           show : false,
        };
    },
    computed: {
        ...mapState('board',{
            show : function(state) {
                console.log("HandUpdate");
                if(){
                    return true;
                }else{
                    return false;
                }
                
            },
        })
    },
}
</script>

<style scoped lang="scss">
.banner-turn-wrapper{
    pointer-events: none;
    user-select: none;
    position: absolute;
    top: 0;left: 0;right: 0; bottom: 0;
    opacity: 0;
    &.show{
        opacity: 1;
        transition: opacity 0.3s;
    }
    .background,.message{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .background{
        opacity: 0.9;
        width: 450px;
        height: 2px;
        background-color: black;
        border-radius: 50%;
        box-shadow: 0 0 100px 100px #000;
    }
    .message{
        color: #e9e9e9;
        font-family: "GWENT";
        font-size: 40px;
        
    }
}
</style>