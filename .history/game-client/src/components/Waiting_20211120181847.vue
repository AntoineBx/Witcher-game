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
        waitingTime : 0
    },

}
</script>

<style>

</style>