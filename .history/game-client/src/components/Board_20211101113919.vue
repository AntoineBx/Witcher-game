<template>
    <div class="board">
        <div class="hand opponent">
            <Card  cardName="iris"/>
            <Card  cardName="Avallach"/>
            <Card  cardName="ciri"/>
        </div>
    
        <div class="field">
            
        </div>
        <div class="hand player">
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
    props: {
        socket: {}
    },
    data() {
        return {
        roomID: "",
        players: [],
        placeholder: [],
        currentTurn: "",
        isStart: false,
        countDown: 0,
        msg: "",
        showMsg: false
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
    }
}
</script>

<style lang="scss">
.hand{
  display: flex;
  flex-wrap: nowrap;
  
  justify-content: center;
  margin-top: 100px;
}
</style>