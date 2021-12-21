<template>
     <div class="hand">
        <div class="totalPlayer">Total Players : {{totalPlayers}}</div>
        <Card  folderName="iris"/>
        <Card  folderName="Avallach"/>
        <Card  folderName="ciri"/>
        
    </div>
</template>

<script>
import Card from "./Card.vue";
export default {
    components: { Card }
}
</script>

<style>

</style>