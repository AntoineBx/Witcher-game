<template>
<div class="score-wrapper">
    <div class="opponent" :class="score1 > score2 ? 'highlight' : '' ">
        <img src="@/assets/board/bannerScoreOpponent.png" />
        {{ score1 }}
    </div>
    <PassedButton />
    <div class="player" :class="score2 > score1 ? 'highlight' : '' ">
        <img src="@/assets/board/bannerScorePlayer.png" />
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
    watch: {
        '$store.state.board.scores': {
            deep:true,
            handler(state){
                console.log("STATEE : ", state)
                if(state[1] != undefined){
                    if(this.$store.state.board.player == 1 ){
                        this.score1 =  state[2];
                        this.score2 =  state[1];
                    }else{
                        this.score1 =  state[1];
                        this.score2 =  state[2];
                    }
                }
            }
        },
        // '$store.state.board.playerTurn': { 
        //     handler(state){
        //         if(this.$store.state.board.player == 1){
        //             this.score1 =  state[2];
        //             this.score2 =  state[1];
        //         }else{
        //             this.score1 =  state[1];
        //             this.score2 =  state[2];
        //         }
        //     }
        // },
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
        .opponent,.player{
            position: relative;
            display: flex;
            text-align: center;
            font-size: 50px;
            font-family: 'GWENT';
            color: white;
            -webkit-text-stroke-width:2px;
            -webkit-text-stroke-color: black;
            
            &>img{
                position: absolute;
                left: 17px;
                z-index: -1;
                height: 150px;
            }
            &.highlight{
                color: yellow;
                font-size: 56px;
            }
        }
        .opponent{
            &>img{
                top: -42px;
            }
        }
        .player{
            &>img{
                top: -65px;
            }
        }
    }

</style>