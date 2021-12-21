<template>
  <div class="banner-turn">

  </div>
</template>

<script>
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapState('board',{
            cards : function(state) {
                return state.cardsState
            }
        })
    },
}
</script>

<style>

</style>