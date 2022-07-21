<template>
    <div class="abilitie">
        {{ abilitie }}
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
        description :function(){
            console.log(this.abilitie)
            return 'lalala';
        }
        
    },
    
}
</script>

<style>

</style>