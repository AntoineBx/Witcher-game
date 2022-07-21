<template>
    <div class="abilitie">
        <img :src="imageUrl" height="100%">
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
        }
        
    },
    
}
</script>

<style>

</style>