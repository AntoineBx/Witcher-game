<template>
    <div class="abilitie">
        <img :src="imageUrl" >
        <div class="desc">
            <h4>{{ abilitieName }}</h4>
            <p>{{ description }}</p>
        </div>
        
    </div>
  
</template>

<script>
export default {
    props: {
        abilitie:{},
    },
    data: function (){
      return{
      }
    },
    computed: {
        imageUrl:function(){
            let ret =  "/src/assets/card/__main/abilities/no_abilitie.png";
            let ab = Object.keys(this.abilitie)[0]
            let abilities = ['scorch','spy','bond']
            if(ab != undefined){
                if(abilities.includes(ab)){
                    ret = "/src/assets/card/__main/abilities/"+ab+".png"
                }
            }
            return ret;
        },
        abilitieName : function(){
            let name = Object.keys(this.abilitie)[0];
            if(name == 'discards'){
                return ''
            }
            return name + ' : ';
        },
        description : function(){
            let ret = '';
            let name = Object.keys(this.abilitie)[0];
            switch(name) {
                case 'scorch':
                    ret = "Destroy the highest value card, or cards if multiple similar point scores exist, in play. This destroys your cards as well."
                    break;
                case 'bond':
                    ret = "Doubles the strength of both cards when placed next to a unit of the same name."
                    break;
                case 'spy':
                    ret = "Place on an opponents battlefield (counts towards their total strength), then draw two cards from your own deck."
                    break;
                case 'decoy':
                    ret = "Swap with a card on the battlefield to return it to your hand - this removes the card's power value from your score."
                    break;
                case 'horn':
                    ret = "Doubles the strength of all units in a given row (limit one per row)."
                    break;
                case 'medic':
                    ret = "Choose one card from your discard pile to play instantly. This excludes heroes or other weather / special cards."
                    break;
                case 'muster':
                    ret = "Finds any cards with the same name in your deck and plays them instantly."
                    break;
                case 'agile':
                    ret = "Can be placed in either the Close Combat or Ranged rows. May not move once the card has been placed."
                    break;
                default:
            }
            return ret;
        }
        
    },
    
}
</script>

<style>

</style>