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