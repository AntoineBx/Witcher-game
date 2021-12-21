<template>
  <div class="waiting-panel" :class=" !waitingData.waiting ? 'hidden':''">
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
    props:{
        waitingData : {}
    },
    watch:{
        waitingData(){
            console.log("waitingData Change")
        }
    }

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