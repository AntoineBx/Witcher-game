<template>
    <div class="field">
        <div class="lines">
                <FieldLine v-for="(field,index) in fieldArranged" :cards="field.cards" :key="field" :index="index" :type="field.type" :frozen="field.frozen" :side="field.side"  />
        </div>
    </div>
</template>

<script>
import FieldLine from "@/components/Board/FieldLine.vue"
import { mapActions, mapState, mapMutations} from 'vuex';

export default {
    components: { FieldLine },
    data: function(){
      return{
        cards : undefined,
        // fieldArranged : [],
      }
    },
    computed: {
        ...mapState('board', {
            fieldArranged(state){
                let fields = state.fields;
                if(state.player == 2){
                    // Reverse mutate the original state ... so i had to use slice to copy it efficiently
                     return state.fields.slice().reverse();
                }
                return state.fields;
            }
        }),
    },
    watch : {
    },
    mounted() {
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
        width: min-content;
        flex-wrap: wrap;
        justify-content: center;
        .line:nth-child(3){
            margin-bottom: 15px;
        }
    }
}
</style>