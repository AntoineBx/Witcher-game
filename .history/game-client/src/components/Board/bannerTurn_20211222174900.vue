<template>
  <div class="banner-turn-wrapper" :class=" show ? 'show' : '' ">
      <div class="background" />
      <div class="message">
          <div class="Number" ></div>
          {{ "YOUR TURN!" }}
      </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    data(){
        return {
            show : false,
            playerTurn : 0,
            player : 0,
            setTimeOutFunc : Function
        };
    },
    watch:{
        '$store.state.board.playerTurn': function() {
            if(this.$store.state.board.playerTurn == this.$store.state.board.player){
                this.playerTurn = this.$store.state.board.playerTurn
                this.player = this.$store.state.board.player
                setTimeout(() => {
                    this.show = true;
                    this.setTimeOutFunc = setTimeout(() => {
                        this.show = false;
                    }, 1200);
                }, 700);    
               
            }else{
                    this.show = false
            }
        },
        '$store.state.board.round': function() {
            
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
.banner-turn-wrapper{
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: 100;
    top: 0;left: 0;right: 0; bottom: 0;
    opacity: 0;
    transition: opacity 0.3s;
    &.show{
        opacity: 1;
        
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