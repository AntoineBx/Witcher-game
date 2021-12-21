<template>
  <div class="banner-turn-wrapper">
      <div class="background" />
      <div class="message">
          YOUR TURN!
      </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapState('board',{
            hand : function(state) {
                console.log("HandUpdate");
                return state.hands[this.player].slice().reverse()
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
    .background,.message{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .background{

    }
    .message{
        
        opacity: 0.7;
        
        background-color: black;
        color: #e9e9e9;
        font-family: "GWENT";
        border-radius: 50%;
        font-size: 50px;
        box-shadow: 0 0 50px 78px #000;
    }
}
</style>