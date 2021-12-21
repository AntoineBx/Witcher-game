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
            waiting : true,
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
        
        &.hidden{
            opacity: 0;
            pointer-events: none;
        }
    }
</style>