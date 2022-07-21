<template>
    <div class="wrapper-inner" @click="cardSelect" :class="selected ?'selected':'' ">
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
            if(this.childSelectedCount < this.selectionMax){
                if(this.selected){
                    this.selected = false;
                    this.$emit('selected', false,this.card.id)
                }else{
                    this.selected = true;
                    this.$emit('selected', true,this.card.id)
                }
            }else{
                if(this.selected){
                    this.selected = false;
                    this.$emit('selected', false,this.card.id)
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .wrapper-inner{
        &.selected{
                box-shadow: 0px 0px 12px 5px #ddc33a, 
                            inset 0px 0px 20px 20px #ddc33ad4;
        }
        .placeholder {
            perspective: 1000px;
            width: 200px;
            height: 288px;
            .card-container {
                transform-origin: left;
                width: 200px;
                height: 288px;
                perspective: 1000px;
                .card{
                     width: 100%!important;
                    height: 100%!important;
                    top: 0%!important;
                    left: 0%!important;
                    .abilitie{
                        width: 55px!important;
                        left: 15px!important;
                    }
                }
            }
          
      }
    }
</style>