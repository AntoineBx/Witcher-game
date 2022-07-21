<template>
  <div class="card-placeholder" ref="currentPlaceholder"></div>
</template>

<script>
import { ADD_CARD_STATUS, SET_CARD_HIDDEN, UPDATE_CARD_STATE_COORD } from '@/store/modules/board/mutations';
import { mapState,mapMutations } from 'vuex'
export default {

    data: function (){
      return{
      }
    },
    props : {
        idCard: "",
        syncPlaceholders:0,
        isOnField : false,
        hidden : false,
    },
    watch: {
        syncPlaceholders: function() {
           setTimeout(() => {
                let ref = this.$refs.currentPlaceholder
                this.setCoord()
           }, 100);
        }
    },
    methods: {
        ...mapMutations('board',[
            UPDATE_CARD_STATE_COORD,
            ADD_CARD_STATUS,
            SET_CARD_HIDDEN
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
            //  console.log("props card placeholder : ", this.idCard);
            if(this.idCard == "" || this.idCard == undefined){ 
                 console.error("placeholder IdCard undefined ! "); 
                return;
            }
            // console.log("idCard : : ", this.idCard)
            // console.log("ref : ",ref)
            
            this[UPDATE_CARD_STATE_COORD]({idCard : this.idCard, coord: { x: ref.getBoundingClientRect().left, y: ref.getBoundingClientRect().top}})
        }
    },
    mounted :function(){
        this.setCoord()
        if(this.isOnField){
            this[ADD_CARD_STATUS]({idCard : this.idCard, status : "onField"})
        }
         this[SET_CARD_HIDDEN]({idCard : this.idCard, value : this.hidden})
        window.addEventListener("resize", this.debounce(()=>{
            this.setCoord()
        }))
    },
}
</script>

<style>
.card-placeholder{
    z-index: -1;
}
</style>