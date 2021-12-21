<template>
    <div class="board">

    
    
        <div class="hand-player">
            <Card  cardName="iris"/>
            <Card  cardName="Avallach"/>
            <Card  cardName="ciri"/>
        </div>
    </div>
    
</template>

<script>
import Card from "@/components/Card.vue"
export default {
    components: { Card },
    props: ["socket"],
    data() {
        return {
        roomID: "",
        players: [],
        placeholder: [],
        currentTurn: "",
        isStart: false,
        winnerImg: null,
        size: null,
        countDown: 0,
        msg: "",
        showMsg: false
        };
    },
    created(){
        this.socket.on("update", data => {
        this.roomID = data.roomID;
        this.cells = data.cells;
        this.currentTurn = data.currentTurn;
        this.winnerImg = data.winner.img;
        this.players = data.players;
        this.isStart = data.isStart;
        this.size = data.size;
    });
    }
}
</script>

<style lang="scss">
.hand-player{
  display: flex;
  flex-wrap: nowrap;
  
  justify-content: center;
  margin-top: 100px;
}
</style>