<template>
  <div class="waiting-panel" :class=" !waiting ? 'hidden':''">
      <div class="inner-panel">
          WAITING ... {{time}}
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
    socket :{
        waiting : function({waiting, time ,maxPlayer}){
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