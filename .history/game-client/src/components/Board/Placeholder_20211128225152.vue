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
        idCard: "",
        syncPlaceholders:0
    },
    watch: {
        syncPlaceholders: function() {
           setTimeout(() => {
                let ref = this.$refs.currentPlaceholder
                this.setCoord()
                this[ADD_CARD_STATUS]({idCard : this.card.idCard, status : "onField"})
           }, 100);
        }
    },
    methods: {
        ...mapMutations('board',[
            UPDATE_CARD_STATE_COORD,
            ADD_CARD_STATUS
        ]),
        debounce : function (func){
            var timer;
            return function(event){
                if(timer) clearTimeout(timer);
                timer = setTimeout(func,200,event);
            };
        },
        setCoord(){
            let ref = this.$refs.currentPlaceholder
            console.log("props card placeholder : ", this.idCard);
            if(this.idCard == "" || this.idCard == undefined){ console.error("placeholder IDCARD undefined ! "); return;}
            this[UPDATE_CARD_STATE_COORD]({idCard : this.idCard, coord: { x: ref.getBoundingClientRect().left, y: ref.getBoundingClientRect().top}})
        }
    },
    mounted :function(){
        this.setCoord()
        this[ADD_CARD_STATUS]({uuid : this.card.uuid, status : "onField"})
         
        window.addEventListener("resize", this.debounce(()=>{
            this.setCoord()
        }))
    },
}
</script>

<style>

</style>