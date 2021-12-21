<template>
  <div class="banner-turn-wrapper">
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
    .message{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: black;
        color: rgb(233, 233, 233);
        font-family: 'GWENT';
        font-size: 50px;
        box-shadow: 1.74em -2.1em 0 0 #a94bb7;;
    }
}
</style>