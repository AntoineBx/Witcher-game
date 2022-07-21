<template>
  <div class="cardsPicker" :class="show ? 'show' : '' ">
    <h1>Choose {{selectionMax}} cards to replace from your hand :</h1>
    
      <ul  class="cards" v-if="show">
        <li class="wrapper" v-for="card in cards" :key="card">
          <CardPickerWrapper @selected="childSelect" :card='card' :childSelectedCount="childSelectedCount" :selectionMax="selectionMax"/>
        </li>
      </ul>
      <h2>Card selected : {{ childSelectedCount }}</h2>
      <button  @click="send" >Confirm</button>
  </div>
</template>

<script>

import { mapState, mapMutations , mapActions } from 'vuex'
import { CARD_PICKER_CLOSE, SET_CARD_HIDDEN } from "@/store/modules/board/mutations";
import CardPickerWrapper from "@/components/Board/cardPickerWrapper.vue";

export default {
    components: { CardPickerWrapper },
    data() {
        return {
            show: false,
            childSelectedCount: 0,
            selectionMax : 2,
            selectCardIds : []
        };
    },
    watch: {
        "$store.state.board.cardPickerToggle": function () {
            this.show = this.$store.state.board.cardPickerToggle;
        }
    },
    computed: {
        ...mapState("board", {
            cards: function (state) {
                
                let ret = [];
                state.cardPicker.cards.forEach(cardId => {
                    ret.push(state.cardsState[cardId]);
                });
                return ret;
            }
        })
    },
    methods:{
      ...mapMutations('board',[
          CARD_PICKER_CLOSE
      ]),
      childSelect(value,cardId){
        if(value == true){
          this.childSelectedCount++;
          this.selectCardIds.push(cardId);
        }else{
          this.childSelectedCount--;
          let index = this.selectCardIds.indexOf(cardId);
          this.selectCardIds.splice(index, 1);
        }
      },
      send(){
        this.$socket.emit("cardsPicked", {
          player : this.$store.state.board.player,
          cards : this.selectCardIds,
          fromWhere : this.$store.state.board.cardPicker.fromWhere,
          toWhere : this.$store.state.board.cardPicker.toWhere,
          replace : true
        });
        this[CARD_PICKER_CLOSE](false);
      }
    },
    
   
}
</script>

<style lang="scss">
.cardsPicker{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  transition: opacity 0.1s;
  background-color: #0000003b;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  &.show{
    transition: opacity 0.15s;
    opacity: 1;
    pointer-events: all;
  }
  ul.cards{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1200px;
    li{
      padding: 20px 20px 0;
      list-style: none;
      animation: appear 0.4s ease-out;
      animation-fill-mode: both;
    }
  }
  button{
    border: none;
    padding: 10px 30px;
    font-size: 30px;
    box-sizing: content-box;
    font-family: 'GWENT';
    &:hover{
      border: 3px solid black;
      padding: 7px 27px;
    }
  }
}
$max-cards: 15;
ul.cards{
  @for $i from 1 through $max-cards {
    li:nth-child(#{$i}) {
      animation-delay: .20s * $i;
    }
  }
}

@keyframes appear{
  0%{
    opacity: 0;
    transform: translate3d(500px,100px,0);
  }
  100%{
    opacity: 1;
    transform: translate3d(0,0,0);
  }
}
</style>