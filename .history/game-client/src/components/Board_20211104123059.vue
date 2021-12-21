<template>
    <div class="board">
        <img class="backBoard" src="@/assets/board/bg.jpg" draggable="false" ondragstart="return false;" alt="">
        <button @click="changehidden" color="white">Change HIDDEN</button>
        <div @mouseover="handHover" class="hand opponent">
            <Card  cardName="iris"/>
            <Card  cardName="Avallach" :hidden="hiddenData"/>
            <Card  cardName="ciri" :hidden="true" />
        </div>

        <Field/>

        <div class="hand player">
            <Card  cardName="iris"/>
            <Card  cardName="Avallach"/>
            <Card  cardName="ciri"/>
        </div>
    </div>
    
</template>

<script>
import Card from "@/components/Card.vue"
import Field from "@/components/Field.vue";
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
        handHover(event){
            console.log(handHover)
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
    &.player{
        bottom: -40px;
    }
    &.opponent{
        top: -120px;
    }
}

</style>