<template>
  <div class="waiting-panel" :class=" !waiting ? 'hidden':''">
      <div class="inner-panel">
            <div v-if="!maxPlayer" class="Waiting">Waiting for opponent ...</div>
            <div v-else >Starting ... {{time}} </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            waiting : false,
            time:0, 
            maxPlayer : false
        };
    },
    sockets :{
        waiting : function({waiting, time ,maxPlayer}){
            console.log("wait",time)
            this.waiting = waiting;
            this.time = time;
            this.maxPlayer = maxPlayer;
        },
    },
}
</script>

<style lang="scss">
    .waiting-panel{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgb(63, 54, 50);
            display: flex;
            align-content: center;
            justify-content: center;
            align-items: center;
        &.hidden{
            opacity: 0;
            pointer-events: none;
        }
        .inner-panel{
            color:white;
        }
    }
</style>