<template>
    
    
    <div class="hand-player">
        <Card  cardName="iris"/>
        <Card  cardName="Avallach"/>
        <Card  cardName="ciri"/>
    </div>
</template>

<script>
import Card from "@/components/Card.vue"
export default {
    components: { Card }
}
</script>

<style lang="scss">
.hand{
  display: flex;
  flex-wrap: nowrap;
  
  justify-content: center;
  margin-top: 100px;
}
</style>