<template>
  <div class="banner-turn">

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

<style>

</style>