<template>
  <button class="button-pass" @click="passed">
     <div>
        <!-- <svg class="progress" viewBox="0 0 32 32">
            <circle r="8" cx="16" cy="16" />
        </svg> -->
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
}
</style>