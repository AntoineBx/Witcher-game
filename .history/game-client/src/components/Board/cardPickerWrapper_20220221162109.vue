<template>
    <div class="wrapper-inner" @click="cardSelect">
        <Card   :cardProps="card" :cardPicker="true" :cardName="card.folderName" :cardPower="card.power" :unmovable="true"  />
    </div>
</template>

<script>
import Card from "@/components/Board/Card.vue";
import { mapState, mapMutations , mapActions } from 'vuex'
import { SET_CARD_HIDDEN } from "@/store/modules/board/mutations";

export default {
    components: { Card },
    props:{
        card : {},
        childSelectedCount: Number,
        selectionMax: Number
    },
    data() {
        return {
            selected: false,
        };
    },
    methods: {
        cardSelect(){
            console.log("selection")
            if(this.childSelectedCount < this.selectionMax){
                if(this.selected){
                    this.selected = false;
                    this.$emit('selected', false)
                }else{
                    this.selected = true;
                    this.$emit('selected', true)
                }
            }else{
                if(this.selected){
                    this.selected = false;
                    this.$emit('selected', false)
                }
            }
            
        }
    }
}
</script>

<style>

</style>