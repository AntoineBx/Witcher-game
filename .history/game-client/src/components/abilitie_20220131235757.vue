<template>
    <div class="abilitie">
        {{ imageUrl }}
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
            let ab = Object.keys(this.abilitie)[0]
            let abilities = ['scorch','spy','bond']
            if(this.ab != undefined){
                if(abilities.includes(ab)){
                    ret = "/src/assets/card/__main/abilities/"+ab+".png"
                }
            }
            return this.abilitie;
        },
        // abilitiedza : function(){
        //     let ret =  "/src/assets/card/__main/abilities/no_abilitie.png";
        //     let abilities = ['scorch','spy','bond']
        //     if(this.abilitie != undefined){
        //         Object.keys(this.cardProps.abilities).forEach(abilitie=>{
        //             if(abilities.includes(abilitie)){
        //                 ret = "/src/assets/card/__main/abilities/"+abilitie+".png"
        //             }
                    
        //         })
        //     }
            
        //     return  ret;
        // }
        
    },
    
}
</script>

<style>

</style>