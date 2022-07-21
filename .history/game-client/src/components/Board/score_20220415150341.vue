<template>
<div class="score">
     {{ score1 }}

     {{ score2 }}
</div>
</template>

<script>
export default {

    data(){
        return {
            score1 : 0,
            score2 : 0,
        }
    },

    watch: {
        '$store.state.board.scores': {
            deep:true,
            handler(state){
                if(this.$store.state.board.player == 1){
                    this.score1 =  state[2];
                    this.score2 =  state[1];
                }else{
                    this.score1 =  state[1];
                    this.score2 =  state[2];
                }
            }
        },
  }
}
</script>

<style>

</style>