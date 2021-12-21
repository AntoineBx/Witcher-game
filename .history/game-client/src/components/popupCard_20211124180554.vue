<template>
  <div class="popup" v-show="open" @click="close" @keydown.esc="close"  tabindex="0">
    <div class="inner-popup" @click="stopClose" >
      <Card  :cardName="this.cardName" :cardProps="cardProps" :unmovable="true" />
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
import CardsList from "@/cards.json";
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
        cardProps:{}
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
  },
  methods: {
    ...mapMutations('popupCard',[
        CLOSE_POPUP
    ]),
    SetCardData:function(){
                const currentCard = this.JsonCards.cards[this.cardName] 
                this.CardData = currentCard; 
    },
    setCardProps(){
      this.cardProps.power = CardData.power
      this.cardProps.folderName = CardData.folderName
      this.cardProps.abilities = CardData.abilities
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
    background-color: #0000003b;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner-popup{
      display: flex;
      .placeholder {
        width: 210px;
        height: 300px;
        .card-container {
          width: 210px;
          height: 300px;
          .card{
            width: 100%;
            height: 100%;
            top: 0%;
            left: 0%;
          }
        }
      }
      .card-resume{
        width: 295px;
        height:100%;
        .header{
          padding: 20px;
          background-image:  url(../assets/misc/title-top.jpg);
          background-size: 100%;
          background-repeat: no-repeat, repeat-y;
          background-position: center top;
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
  }
</style>