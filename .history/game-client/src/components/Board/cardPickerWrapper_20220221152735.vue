<template>
    <div class="wrapper-inner">
        <Card   :cardProps="card" :cardPicker="true" :cardName="card.folderName" :cardPower="card.power" :unmovable="true"  />
    </div>
</template>

<script>
import Card from "@/components/Board/Card.vue";
export default {

}
</script>

<style>

</style>