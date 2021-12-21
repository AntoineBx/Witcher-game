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
        cells: [],
        currentTurn: "",
        isStart: false,
        winnerImg: null,
        size: null,
        countDown: 0,
        msg: "",
        showMsg: false
        };
    },
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