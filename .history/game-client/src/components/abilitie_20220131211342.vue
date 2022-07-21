<template>
<div class="abilitie">
     {{ description }}
    
</div>
  
</template>

<script>
export default {
    props: {
        abilitie
    },
    data: function (){
            return{}
    },
    computed: {
        description :function(){
            console.log(this.abilitie)

            return 'zlakflkazmflk';
        }
        
    },
    
}
</script>

<style>

</style>