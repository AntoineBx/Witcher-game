<template>
  <div class="popup" :class="delayOpen?'showing':''" @click="close" @contextmenu="close" @keydown.esc="close" tabindex="0">
    <div class="inner-popup" @click="stopClose" @contextmenu="close">
      <Card  :cardName="this.cardName" :cardProps="cardProps" :unmovable="true" :showcaseCard="true" />
      <div class="card-resume">
        <div class="header">
          <h1>{{ this.CardData.name }}</h1>
        </div>
        <div class="description">
          <p>{{ this.CardData.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardsList from "../../../data/cards.json";
import Card from "@/components/Board/Card.vue";
import { CLOSE_POPUP } from "@/store/modules/popupCard/mutations";
import { mapState, mapMutations } from 'vuex'

export default {
  components: { Card },
   data: function (){
    return{
        JsonCards: CardsList,
        CardData :{
            name:"",
            folderName:"",
            power: "1",
            rarity: "0",
            border:"bronze",
            banner : "default",
            positioning: ["infantry","ranged","siege"],
            description : "",
        },
        cardProps:{},
        delayOpen : false
    }
   },
  computed: {
    ...mapState('popupCard',{
        open: state => state.open,
        cardName: state => state.cardName,
    }),
    
  },
  watch :{
    cardName: function() {
      this.SetCardData();
    },
    open : function(){
      setTimeout(() => {
        this.delayOpen = this.open
      }, 30);
      
    }
  },
  methods: {
    ...mapMutations('popupCard',[
        CLOSE_POPUP
    ]),
    SetCardData:function(){
                const currentCard = this.JsonCards.cards[this.cardName] 
                this.CardData = currentCard; 
                this.setCardProps();
    },
    setCardProps:function(){
      this.cardProps.power = this.CardData.power
      this.cardProps.folderName = this.CardData.folderName
      this.cardProps.abilities = this.CardData.abilities
    },
    close : function(){
      this[CLOSE_POPUP]();
    },
    stopClose : function(e){
      e.stopPropagation();
    },
    
  }

}
</script>

<style lang="scss">

  .popup{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    background-color: #0000003b;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    
    pointer-events: none;
    .inner-popup{
      display: flex;
      .placeholder {
        perspective: 1000px;
        width: 320px;
        height: 450px;
        .card-container {
          transform: rotateY(270deg);
        
          transform-origin: left;
          width: 320px;
          height: 450px;
          perspective: 1000px;
          pointer-events: none;
          .card{
            width: 100%;
            height: 100%;
            top: 0%;
            left: 0%;
             .abilitie{
                width: 55px;
                left: 15px;
            }
          }
        }
      }
      .card-resume{
        width: 400px;
        height:100%;
        .header{
          padding: 25px 20px 20px;
          background-image:  url(../assets/misc/title-top.jpg);
          background-size: 100%;
          background-repeat: no-repeat, repeat-y;
          background-position: center top;
          h1{
            margin: 0;
          }
        }
        .description{
          box-sizing: border-box;
          padding: 20px;
          width:100%;
          background-image:  url(../assets/misc/description-bottom.png),url(../assets/misc/description.jpg);
          background-size: 100%;
          background-repeat: no-repeat, repeat-y;
          background-position: center bottom;
        }
      }
    }
    &.showing{
      transition: opacity 0.15s;
      opacity: 1;
      pointer-events: all;
      .placeholder .card-container {
        animation: cardAppear 1s ease-out;
        pointer-events: all;
          transition: transform 0s;
          transform: rotateY(360deg);
      }
    }
  }
</style>