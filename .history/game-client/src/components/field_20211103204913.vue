<template>
  <div class="field">
            <field-line type="siege"></field-line>
            <field-line type="ranged"></field-line>
            <field-line type="infantry"></field-line>

            <field-line type="infantry"></field-line>
            <field-line type="ranged"></field-line>
            <field-line type="siege"></field-line>
        </div>
</template>

<script>
import Card from "@/components/field-line.vue"
import fieldLine from './field-line.vue'
export default {
  components: { fieldLine },

}
</script>

<style>

</style>