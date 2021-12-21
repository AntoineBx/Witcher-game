<template>
  <div class="waiting-panel" :class="hidden">
      <div class="inner-panel">
          WAITING ... {{waitingTime}}
      </div>
  </div>
</template>

<script>
export default {

    props:{
        waitingData : {
            waiting : false,
            time:0, 
            maxPlayer : false
        }
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