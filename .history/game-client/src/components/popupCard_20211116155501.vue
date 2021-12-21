<template>
  <div class="popup" v-show="open" @click="close">
    <div class="inner-popup">
       <Card  :cardName="this.cardName" :unmovable="true" />
      <div class="card-resume">
        <div class="header">
          <h1>{{ this.CardData.name }}</h1>
          <h3></h3>
        </div>
        <div class="description">

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
            Power: "1",
            rarity: "0",
            border:"bronze",
            banner : "default",
            positioning: ["infantry","ranged","siege"],
            description : "",
        },
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
                const currentCard = this.JsonCards.cards.find(x => x.folderName === this.cardName)
                this.CardData = currentCard; 
    },
    close : function(){
      this[CLOSE_POPUP]();
    }
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
          }
        }
      }
      .card-resume{
        width: 400px;
        height:100%;
        .header{
          padding: 20px;
          background-image:  url(../assets/misc/title-top_.jpg)
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