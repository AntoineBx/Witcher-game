<template>
  <div class="line">
    <div class="horn-place">
    </div>
    <div ref="currentLine"  class="inner-line" :class="[type ,frozen? 'frozen' : '' , allowDropClass != undefined ? 'highlight' : '']" >
        <Placeholder v-for="idCard in cards" :key="idCard"   :idCard="idCard" :syncPlaceholders="syncPlaceholders" :isOnField="true"/>
    </div>
  </div>
</template>

<script>
import Placeholder from "@/components/Board/cardPlaceholder/Placeholder.vue"
import { USER_ADD_CARD_TO_FIELD } from "@/store/modules/board/actions"
import { ADD_CARD_STATUS, ADD_CARD_TO_FIELD,UPDATE_CARD_STATE_COORD, SET_ZINDEX, UPDATE_PLAYER_TURN } from '@/store/modules/board/mutations'
import { mapState,mapMutations, mapActions } from 'vuex'

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
        cards : {},
        frozen : Boolean
    },
    computed: {
      ...mapState('board',{
          allowDropClass(state){
            let ret = ""
            if(state.currentCardData?.abilities?.spy ){
                ret = state.currentCardData.positioning != undefined ?
                      state.currentCardData.positioning.indexOf(this.type) != -1 ?
                      state.player != this.side ?
                      true:undefined:undefined:undefined;
            }else{
              ret = state.currentCardData.positioning != undefined ?
                      state.currentCardData.positioning.indexOf(this.type) != -1 ?
                      state.player == this.side ?
                      true:undefined:undefined:undefined;
            }
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
            // if inside allowed space
            if(lenghtX.left <= this.$store.state.board.mousePosOnRelease.x && this.$store.state.board.mousePosOnRelease.x <= lenghtX.right &&
              lenghtY.top <= this.$store.state.board.mousePosOnRelease.y && this.$store.state.board.mousePosOnRelease.y <= lenghtY.bottom){
              let newRow = this.index
              //reverse Row position if player 2
              if(this.$store.state.board.player == 2){
                newRow = Math.abs( newRow - 5 )
              }
              // this[USER_ADD_CARD_TO_FIELD]({row :newRow, position : 9, idCard : this.wasHolding })
              // console.log("placeCardOnField ! !", {idCard : this.wasHolding , row : newRow});
              //Temporary lock card in place waiting for the server response
              this[UPDATE_CARD_STATE_COORD]({
                idCard : this.wasHolding,
                coord : { x : this.$store.state.board.mousePosOnRelease.x - 45 , y : this.$store.state.board.mousePosOnRelease.y - 70}
              })
              // this[SET_ZINDEX]({idCard : this.wasHolding , zindex : (this.index+1)*100 })
              this[ADD_CARD_STATUS]({idCard : this.wasHolding , status : "onField"})
              this.$socket.emit("placeCardOnField", {idCard : this.wasHolding , row : newRow});
              //Prevent player from playing another card until the server response
              this[UPDATE_PLAYER_TURN](0)
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
          ADD_CARD_STATUS,
          UPDATE_CARD_STATE_COORD,
          UPDATE_PLAYER_TURN,
          SET_ZINDEX
      ]),
    }
}
</script>

<style lang="scss">

  $boxShadowLine: 0px 10px 13px 0px #000000;
  .card-placeholder {
      width: 90px;
      height: 125px;
  }
  .line{
    height: 120px;
    box-sizing: border-box;
    display: flex;
    .horn-place{
      width: 140px;
      height: 97%;
      box-shadow: 0px 10px 13px 0px #000000;
      background-image: url("../../assets/board/horn-icon.jpg");
      background-size: 96% 99%;
      background-repeat: no-repeat;
      background-position: 0px 2px;
      .score{
        width: 61px;
        height: 95%;
        margin: 3px 0 0 -57px;
        background-image: url("../../assets/board/score-line.png");
        background-size: cover
      }
    }
    .inner-line{
        box-sizing: border-box;
        border: solid #29150b 2px;
        transition : border 0.15s ease-out, box-shadow 0.3s ease-in-out;
        width: 734px;
        height: 100%;
        box-shadow: $boxShadowLine,
        inset 0px -8px 25px -25px #4fc0fa;
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
        &.frozen{
          
          &.infantry{
            box-shadow: inset 0px 0px 25px 10px #4fc1fab6,
            $boxShadowLine;
          }
          &.ranged{
            box-shadow: inset 0px 0px 25px 10px #c2c2c2,
            $boxShadowLine;
          }
          &.siege{
            box-shadow: inset 0px 0px 25px 10px #646464,
            $boxShadowLine;
          }
        }
    }
          
  }

</style>