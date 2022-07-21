<template>
    <div class="abilitie">
        <img :src="imageUrl"  Height="100%">
        <h4></h4>
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
            return Object.keys(this.abilitie)[0];
        }
        
    },
    
}
</script>

<style>

</style>