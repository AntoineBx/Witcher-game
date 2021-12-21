<template>
    <div class="board">
        <img class="backBoard" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
        <button @click="changehidden" color="white">Change HIDDEN</button>
        <div ref="handOpponent" @mouseover="hoverHand(false)"  @mouseleave="hoverOutHand(false)" class="hand opponent">
            <Card  cardName="iris"/>
            <Card  cardName="Avallach" :hidden="hiddenData"/>
            <Card  cardName="ciri" :hidden="true" />
        </div>

        <Field/>

        <div ref="handPlayer" @mouseover="hoverHand(true)" @mouseleave="hoverOutHand(true)" class="hand player">
            <Card  cardName="iris"/>
            <Card  cardName="Avallach"/>
            <Card  cardName="ciri"/>
        </div>
    </div>
    
</template>

<script>
import Card from "@/components/Card.vue"
import Field from "@/components/Field.vue";
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex'
export default {
    components: { Card, Field },
    props: {
        socket: {}
    },
    data(){
        return {
            roomID: "",
            players: [],
            placeholder: [],
            currentTurn: "",
            isStart: false,
            countDown: 0,
            msg: "",
            showMsg: false,
            hiddenData: true
        };
    },

    created() {
        this.socket.on("update", data => {
            this.roomID = data.roomID;
            this.placeholders = data.placeholders;
            this.currentTurn = data.currentTurn;
            this.players = data.players;
            this.isStart = data.isStart;
        });
    },
     methods: {
        changehidden : function(){
            this.hiddenData = !this.hiddenData;
            
        },
        hoverHand(playerHand){
            if(playerHand){
                this.$refs.handPlayer.style.bottom = "5px"
            }else{
                this.$refs.handOpponent.style.top = "5px"
            }
        },
        hoverOutHand(playerHand){
            if(playerHand){
                this.$refs.handPlayer.style.bottom = ""
            }else{
                this.$refs.handOpponent.style.top = ""
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
        bottom: -40px;
    }
    &.opponent{
        top: -120px;
    }
}

</style>