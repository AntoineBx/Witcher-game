<template>
    <div class="board" :class="hidden ? 'hidden' : '' ">
        <img class="backBoard" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
        <button @click="changehidden" color="white">Change HIDDEN</button>
        <div class="side opponent">
            <div ref="handOpponent" @mouseover="hoverHand(false)"  @mouseleave="hoverOutHand(false)" class="hand opponent">
                <!-- <Card  cardName="iris"/>
                <Card  cardName="avallach" :hidden="hiddenBool"/>
                <Card  cardName="ciri" :hidden="true" /> -->
            </div>
        </div>
        <Field/>
        <div class="side player">
            <div ref="handPlayer" @mouseover="hoverHand(true)" @mouseleave="hoverOutHand(true)" class="hand player">
                <!-- <Card  cardName="iris"/>
                <Card  cardName="avallach"/>
                <Card  cardName="iris"/>
                <Card  cardName="avallach"/>
                <Card  cardName="ciri"/>
                <Card  cardName="avallach"/>
                <Card  cardName="ciri"/> -->
            </div>
            <Deck />
    
        </div>
    </div>
    
</template>

<script>
import Card from "@/components/Board/Card.vue";
import Field from "@/components/Board/Field.vue";
import Deck from "./Deck.vue";

export default {
    components: { Card, Field, Deck },
    props: {
        hidden : Boolean
    },
    data(){
        return {
            roomID: "",
            players: [],
            placeholder: [],
            decks : [],
            currentTurn: "",
            isStart: false,
            countDown: 0,
            msg: "",
            showMsg: false,
            hiddenBool: true
        };
    },

    created() {

    },
    methods: {
        changehidden : function(){
            this.hiddenBool = !this.hiddenBool;
        },
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
.hand{
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    z-index: 1;
    transition: top 0.5s,bottom 0.5s;
    &.player{
        // bottom: -40px;
    }
    &.opponent{
        top: -120px;
    }
}

</style>