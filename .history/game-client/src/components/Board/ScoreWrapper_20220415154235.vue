<template>
<div class="score-wrapper">
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
import PassedButton from './PassedButton.vue';
import { mapState } from 'vuex'

export default {
    components: { PassedButton } ,
    data(){
        return {
            score1 : 0,
            score2 : 0,
        }
    },
    computed:{
         ...mapState('board',{
             player: state => state.player,
             score1 : function(state) {
                 if(state.player == 1){
                     return scores[1];
                 }else{
                     return scores[2];
                 }
             },
             score2 : function(state) {
                 if(state.player == 1){
                     return scores[1];
                 }else{
                     return scores[2];
                 }
             },
             opponentTurn: function(state) {
                if(state.player == 1 && state.playerTurn == 2 || state.player == 2 && state.playerTurn == 1 ){
                    return true
                }
                return false
            },
         })
    },
    watch: {
        '$store.state.board.scores': {
            deep:true,
            handler(state){
                console.log("STATEE : ", state)
                if(this.$store.state.board.player == 1){
                    
                    this.score1 =  state[2] == undefined ? this.score1 : state[2];
                    this.score2 =  state[1] == undefined ? this.score2 : state[1];
                }else{
                    this.score1 =  state[1] == undefined ? this.score1 : state[2];
                    this.score2 =  state[2] == undefined ? this.score1 : state[1];
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

    .score-wrapper{
        position: absolute;
        top: 45%;
        right: 2px;
        perspective: 300px;
        transform: translateY(-50%);
        &>div{
            text-align: center;
            font-size: 40px;
            font-family: 'GWENT';
            color: white;
            margin: 20px 0;
        }
    }

</style>