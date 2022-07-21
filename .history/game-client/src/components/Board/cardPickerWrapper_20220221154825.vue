<template>
    <div class="wrapper-inner" @click="selection()">
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
        card : {}
    },
    data() {
        return {
            selected: false,
        };
    },
    methods: {
        selection : function(event){

        }
    }
}
</script>

<style>

</style>