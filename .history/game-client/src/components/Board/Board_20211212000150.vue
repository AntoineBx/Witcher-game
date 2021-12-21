<template>
    <div class="wrapper-board" :class="opponentTurn ? 'opponentTurn' : '' ">
        <div class="board" :class="hidden ? 'hidden' : '' ">
            <BannerTurn/>
            <img class="backBoard" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
            <CardsStack  />

            <div class="side opponent">
                <Hand :player="player == 1 ? 2 : 1" :hidden="true" />
            </div>
            <div class="side player">
                <Hand :player="player" :hidden="false"/>
            </div>
            <Field />
            
            <div class="right-wrapper">
                <Deck :player="player == 1 ? 2 : 1" :opponent="true" :hidden="true" />
                <ShowcaseCard />
                <Deck :player="player" :opponent="false" :hidden="true" />
            </div>
            
        </div>
    </div>
</template>

<script>
import Card from "@/components/Board/Card.vue";
import Field from "@/components/Board/Field.vue";
import Deck from "@/components/Board/Deck.vue";
import { mapActions, mapState, mapMutations} from 'vuex'
import CardsStack from "./CardsStack.vue";
import Hand from "./Hand.vue";
import ShowcaseCard from "./ShowcaseCard.vue";
import BannerTurn from "./bannerTurn.vue";

export default {
    components: { Card, Field, Deck, CardsStack, Hand, ShowcaseCard, BannerTurn },
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
            playerTurn: state => state.playerTurn,
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
    transition: transform 0.3s;
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