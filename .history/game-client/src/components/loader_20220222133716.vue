<template>
  
</template>

<script>
import preload from 'preloadjs';
export default {
    data() {
        return {
            game: createjsList[this.id],
            queue: null
        }
    },
    created() {
        this.$createJsQueue = new createjs.LoadQueue()

        // Expose some internal value of the instance
        this.queue = this.$createJsQueue._queue
    },
    mounted: function(){
        console.log(queue)
    }
    
}
</script>

<style>

</style>