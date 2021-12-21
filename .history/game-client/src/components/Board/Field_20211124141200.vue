<template>
    <div class="field">
        <div class="lines">
                <FieldLine v-for="(field,index) in fieldArranged" :key="field" :index="index" :type="field.type" :side="field.side" :cards="field.cards" />
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
        cards : undefined,
        fieldArranged : [],
      }
    },
    computed: {
        ...mapState('board', {
            // fieldArranged(state){
            //     let fields = state.fields;
            //     if(state.player == 2){
            //         console.log("reversed")
            //          return state.fields.reverse();
            //     }
            //     return state.fields;
            // }
        }),
    },
    watch : {
        '$store.state.board.triggerFields': function() {
            
        }
    },
    mounted() {
        this.fieldArranged = this.$store.state.board.fields;
        console.log("not reversed mounted")
                if(this.$store.state.board.player == 2){
                    console.log("reversed mounted")
                     this.fieldArranged = this.$store.state.board.fields.reverse();
                }
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