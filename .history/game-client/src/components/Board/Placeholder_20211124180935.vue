<template>
  <div class="card-placeholder" ref="currentPlaceholder"></div>
</template>

<script>
import { ADD_CARD_STATUS, UPDATE_CARD_STATE_COORD } from '@/store/modules/board/mutations';
import { mapState,mapMutations } from 'vuex'
export default {

    
    data: function (){
      return{
      }
    },
    props : {
        card:{},
        syncPlaceholders:0
    },
    watch: {
        syncPlaceholders: function() {
           setTimeout(() => {
                let ref = this.$refs.currentPlaceholder
                this[UPDATE_CARD_STATE_COORD]({uuid : this.card.uuid, coord: { x: ref.getBoundingClientRect().left, y: ref.getBoundingClientRect().top}})
                this[ADD_CARD_STATUS]({uuid : this.card.uuid, status : "onField"})
           }, 100);
        }
    },
    methods: {
        ...mapMutations('board',[
            UPDATE_CARD_STATE_COORD,
            ADD_CARD_STATUS
        ]),
    },
    mounted :function(){
        let ref = this.$refs.currentPlaceholder
        this[UPDATE_CARD_STATE_COORD]({uuid : this.card.uuid, coord: { x: ref.getBoundingClientRect().left, y: ref.getBoundingClientRect().top}})
        this[ADD_CARD_STATUS]({uuid : this.card.uuid, status : "onField"})

        let current = this.$refs.currentPlaceholder;

        this.$refs.currentPlaceholder.addEventListener('mousemove',(event)=> {

        })
    },
}
</script>

<style>

</style>