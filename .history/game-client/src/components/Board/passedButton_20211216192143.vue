<template>
  <button class="button-pass" @click="passed">
     <div>
        <svg class="progress" viewBox="0 0 32 32">
            <circle r="8" cx="16" cy="16" />
            PASSED
        </svg>
    </div>
</button>
</template>

<script>
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

<style>

</style>