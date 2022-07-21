<template>
  <div class="banner-winner" :class=" show ? 'show' : '' ">
      <div class="background" />
      <div class="message">
          <div class="Number" ></div>
          {{ messages[messageId] }}
      </div>
  </div>
</template>

<script>
import {  mapState, mapGetters } from 'vuex'

export default {
    data(){
        return {
            show : false,
            playerTurn : 0,
            messageId : 0,
            messages : [
                "DRAW!",
                "YOU WIN THE ROUND!",
                "YOU LOOSE THE ROUND!"
            ],
            setTimeOutFunc : Function
        };
    },
    computed: {
        ...mapState('board',{
            player: state => state.player,
        }),
        ...mapGetters('board',[
            'opponent',
        ])
    },
    sockets: {
        getWinnerRound : function (winner) {
            this.show = true;
            this.messageId = this.player == winner ? 1 : winner == 0 ? 0 : 2;
            setTimeout(() => {
                this.show = false;
            }, 1000);
        },
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
.banner-winner{
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