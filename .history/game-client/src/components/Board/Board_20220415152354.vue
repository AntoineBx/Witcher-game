<template>
    <div id="board">
        <PassedBanner/>
        <div class="wrapper-board" :class="opponentTurn ? 'opponentTurn' : '' ">
            <div class="board" :class="hidden ? 'hidden' : '' ">
                <BannerTurn/>
                <BannerWinner/>
                <img class="backBoard" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
                <CardsStack  />
                <div class="side opponent">
                    <Hand :player="player == 1 ? 2 : 1" :hidden="true" />
                </div>
                <div class="side player">
                    <Hand :player="player" :hidden="false"/>
                </div>

                <ScoreWrapper/>
                
                <div class="left-wrapper">
                    <Profil/>
                </div>
                <Field />
                <div class="right-wrapper">
                    <div>
                        <Deck :player="player == 1 ? 2 : 1" :opponent="true" :hidden="true" />
                        <Graveyard :player="player == 1 ? 2 : 1" :opponent="true" :hidden="false" />
                    </div>
                    <ShowcaseCard />
                    <div>
                        <Deck :player="player" :opponent="false" :hidden="true" />
                        <Graveyard :player="player" :opponent="false" :hidden="false" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Board/Card.vue";
import Field from "@/components/Board/Field.vue";
import Deck from "@/components/Board/cardPlaceholder/Deck.vue";
import Hand from "@/components/Board/cardPlaceholder/Hand.vue";
import Graveyard from "@/components/Board/cardPlaceholder/Graveyard.vue";
import { mapActions, mapState, mapMutations} from 'vuex'
import CardsStack from "./CardsStack.vue";

import ShowcaseCard from "./ShowcaseCard.vue";
import BannerTurn from "./bannerTurn.vue";
import PassedBanner from "./passedBanner.vue";
import ScoreWrapper from "./ScoreWrapper.vue"
import BannerWinner from "./bannerWinner.vue";
import Profil from "./profil/Profil.vue";


export default {
    components: { Card, Field, Deck, CardsStack, Hand, ShowcaseCard, BannerTurn, PassedBanner, ScoreWrapper, Graveyard, BannerWinner, Profil },
    props: {
        hidden : Boolean
    },
    data(){
        return {
            roomID: "",
            placeholder: [],
            decks : [],
            currentTurn: "",
            isStart: false,
            countDown: 0,
            msg: "",
            showMsg: false,
            hiddenBool: false,
        };
    },

    created() {

    },
    computed:{
        ...mapState('board',{
            player: state => state.player,
            opponentTurn: function(state) {
                if(state.player == 1 && state.playerTurn == 2 || state.player == 2 && state.playerTurn == 1 ){
                    return true
                }
                return false
            },
        }),
    },
    methods: {
       
        hoverHand(playerHand){
            if(playerHand){
                // this.$refs.handPlayer.style.bottom = "5px"
            }else{
                // this.$refs.handOpponent.style.top = "5px"
            }
        },
        hoverOutHand(playerHand){
            if(playerHand){
                // this.$refs.handPlayer.style.bottom = ""
            }else{
                // this.$refs.handOpponent.style.top = ""
            }
        }
     }
    
}
</script>

<style lang="scss">
.wrapper-board{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform: translate(-50%,-50%);
    &.opponentTurn{
        transform: translate(-50%, -40%);
    }
    .board{
       display: flex;
        justify-content: center;
        &.hidden{
            opacity: 0;
            pointer-events: none;
            z-index: -1;
        }
        .right-wrapper{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            &>div {
                display: flex;
            }
        }
    }
    .backBoard{
        position: absolute;
        width: 100%;
        height: 110%;
        top: -10%;
        z-index: -1;
    }
}

</style>