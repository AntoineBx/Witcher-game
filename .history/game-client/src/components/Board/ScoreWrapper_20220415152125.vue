<template>
<div class="score">
    <div class="opponent">
        {{ score1 }}
    </div>
    <PassedButton />
    <div class="player">
        {{ score2 }}
    </div>
</div>
</template>

<script>
export default {
    components: { PassedButton } ,
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
        '$store.state.board.playerTurn': { 
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

<style lang="scss">

    .score{
        &>div{
            
        }
    }

</style>