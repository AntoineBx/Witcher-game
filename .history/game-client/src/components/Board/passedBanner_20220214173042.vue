<template>
    <div class="passed-banner-wrapper" >
        <div class="banner opponent" :class="showOpponentPassed ? 'show' : '' ">
            <div class="background" />
            <div class="message">
                PASSED
            </div>
        </div>
        <div class="banner player" :class="showPlayerPassed ? 'show' : '' ">
            <div class="background" />
            <div class="message">
                PASSED
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations} from 'vuex'

export default {
    data(){
        return {
            showPlayerPassed : false,
            showOpponentPassed : false,
        };
    },
    watch:{
        '$store.state.board.passed1': function() {
            if(this.$store.state.board.passed1){
                if(this.$store.state.board.player == 1){
                    this.showPlayerPassed = true
                }else{
                    this.showOpponentPassed = true
                }
            }else{
                if(this.$store.state.board.player == 1){
                    this.showPlayerPassed = false
                }else{
                    this.showOpponentPassed = false
                }
            }
        },
        '$store.state.board.passed2': function() {
            if(this.$store.state.board.passed2){
                if(this.$store.state.board.player == 1){
                    this.showOpponentPassed = true
                }else{
                    this.showPlayerPassed = true
                }
            }else{
                if(this.$store.state.board.player == 1){
                    this.showOpponentPassed = false
                }else{
                    this.showPlayerPassed = false
                }
            }
        }
    },
    methods: {
        
    }
}
</script>

<style scoped lang="scss">
.passed-banner-wrapper{
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: 100;
    top: 0;left: 0;right: 0; bottom: 0;
    
    .banner{
        transition: opacity 0.3s;
        opacity: 0;
        position: absolute;
        left: 50%;
        .background,.message{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .background{
            opacity: 0.9;
            width: 450px;
            height: 0px;
            background-color: #0b0b0b;
            border-radius: 50%;
            box-shadow: 0 0 100px 100px #000;
        }
        .message{
            color: #e9e9e9;
            font-family: "GWENT";
            font-size: 40px;
        }

        &.opponent{
            top: 50px;
        }
        &.player{
            bottom: 50px;
        }
        &.show{
            opacity: 1;
            &.opponent{
                transition: top 0.5s 2s, opacity 0.3s;
                top: 15px;
            }
            &.player{
                transition: bottom 0.5s 2s, opacity 0.3s;
                bottom: 15px;
            }
            .background{
                transition: width 0.5s 2s, box-shadow 0.5s 2s;
                width: 1000px;
                box-shadow: 0 0 60px 50px #000;
            }
            .message{
                transition: font-size 0.5s 2s;
                font-size: 25px;
            }

        }
        
    }
    
}
</style>