<template>
    <div class="abilitie">
        <img :src="imageUrl"  Height="100%">
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
            return name;
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


                default:
        }
        
    },
    
}
</script>

<style>

</style>