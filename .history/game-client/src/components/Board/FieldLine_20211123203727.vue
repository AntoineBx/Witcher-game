<template>
  <div class="line">
    <div ref="currentLine"  class="inner-line" :class="[type , allowDropClass != undefined ? 'highlight' : '']" >
        <Placeholder v-for="card in cards" :key="card"   :card="card" :syncPlaceholders="syncPlaceholders"/>
    </div>
  </div>
</template>

<script>
import Placeholder from "@/components/Board/Placeholder.vue"
import { USER_ADD_CARD_TO_FIELD } from "@/store/modules/board/actions"
import { ADD_CARD_TO_FIELD } from '@/store/modules/board/mutations'
import { mapGetters,mapState,mapMutations, mapActions } from 'vuex'

export default {
  components: { Placeholder },
    data: function (){
      return{
        allowDroping : undefined,
        syncPlaceholders : 0
      }
    },
    props : {
        index : 0,
        type : "",
        side : null,
        cards : {}
    },
    computed: {
      ...mapState('board',{
          allowDropClass(state){
            let ret = state.currentCardData.positioning != undefined ?
                    state.currentCardData.positioning.indexOf(this.type) != -1 ?
                    state.player == this.side ?
                    true:undefined:undefined:undefined;
            this.allowDroping = ret;
            return ret;
          },
          wasHolding: state => state.wasHolding
      }),
    },
    watch: {
      cards: {
        deep:true,
        handler(){
          this.syncPlaceholders++
        }
        
      },
      '$store.state.board.mousePosOnRelease': function() {
          let lenghtX = {left : this.$refs.currentLine.getBoundingClientRect().left , right : this.$refs.currentLine.getBoundingClientRect().right }
          let lenghtY = {top : this.$refs.currentLine.getBoundingClientRect().top , bottom : this.$refs.currentLine.getBoundingClientRect().bottom }

          if(this.allowDroping != undefined){
            if(lenghtX.left <= this.$store.state.board.mousePosOnRelease.x && this.$store.state.board.mousePosOnRelease.x <= lenghtX.right &&
              lenghtY.top <= this.$store.state.board.mousePosOnRelease.y && this.$store.state.board.mousePosOnRelease.y <= lenghtY.bottom ){
                let newRow = this.index
                if(this.$store.state.board.player == 2){ 
                  newRow = Math.abs( newRow - 5 )}  
              this[USER_ADD_CARD_TO_FIELD]({Row :this.index, position : 9, uuid : this.wasHolding })
            }
          }
          this.$store.state.board.mousePosOnRelease;
          this.cardID = this.$store.state.board.wasHolding
      },
    },
    methods: {
      ...mapActions('board',[
        USER_ADD_CARD_TO_FIELD
      ]),
      ...mapMutations('board',[
          ADD_CARD_TO_FIELD,
      ]),
    }
}
</script>

<style lang="scss">
  .card-placeholder {
      width: 90px;
      height: 125px;
  }
  .line{
    box-sizing: border-box;
    .inner-line{
        box-sizing: border-box;
        border: solid #29150b 2px;
        transition : border 0.15s ease-out;
        width: 734px;
        height: 120px;
        box-shadow: 0px 10px 13px 0px #000000;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        margin-bottom: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.siege{
            background-image: url("../../assets/board/siege-field.jpg");
        }
        &.ranged{
            background-image: url("../../assets/board/ranged-field.jpg");
        }
        &.infantry{
            background-image: url("../../assets/board/infantry-field.jpg");
        }


        &.highlight{
          border: #9c9439 2px solid;
        }
    }
          
  }

</style>