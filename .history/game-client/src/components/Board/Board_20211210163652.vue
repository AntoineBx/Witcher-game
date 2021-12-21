<template>
    <div class="wrapper-board">
        <div class="board" :class="hidden ? 'hidden' : '' ">
            <img class="backBoard" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
            <CardsStack  />
            <div class="side opponent">
                <Hand :player="player == 1 ? 2 : 1" :hidden="true" />
                <Deck :player="player == 1 ? 2 : 1" :hidden="true" />
            </div>

            <Field />
            <ShowcaseCard />
            
            <div class="side player">
                <Hand :player="player" :hidden="false"/>
                <Deck :player="player" :hidden="true" />
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

export default {
    components: { Card, Field, Deck, CardsStack, Hand, ShowcaseCard },
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
        ...mapState('board',[
            'player'
        ]),
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
.board{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%,-50%);
    &.hidden{
        opacity: 0;
        pointer-events: none;
        z-index: -1;
    }
}
.backBoard{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
}


</style>