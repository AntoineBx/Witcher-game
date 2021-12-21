<template>
  <div class="waiting-panel">
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

<style>

</style>