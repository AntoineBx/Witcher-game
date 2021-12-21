<template>
    <div class="field">
        <div class="lines" >
                <FieldLine v-for="(field,index) in fields" :key="field" :index="index" :type="field.type" :side="field.side" :cards="field.cards" />
            
        </div>
            
    </div>
</template>

<script>
import FieldLine from "@/components/Board/FieldLine.vue"
import {mapGetters, mapActions, mapState, mapMutations} from 'vuex';

export default {
    components: { FieldLine },
    data: function (){
      return{
        cards : undefined
      }
    },
    computed: {
        ...mapState('board', [
            'fields'
        ]),
    },
    mounted() {
        // console.log(this.fields[3]);
    },
    method : {
        
    }
}
</script>

<style lang="scss">

.field{
    .lines{
        margin: auto;
        display: flex;
        width: 624px;
        flex-wrap: wrap;
        justify-content: center;
    }
    
}
</style>