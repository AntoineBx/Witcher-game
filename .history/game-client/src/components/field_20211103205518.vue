<template>
  <div class="field">
            <FieldLine type="siege"/>
            <FieldLine type="ranged"/>
            <FieldLine type="infantry"/>

            <FieldLine type="infantry"/>
            <FieldLine type="ranged"/>
            <FieldLine type="siege"/>
        </div>
</template>

<script>
import Card from "@/components/FieldLine.vue"

export default {
    components: { FieldLine },
}
</script>

<style>

</style>