<template>
  <div class="field">
            <Field-line type="siege"></field-line>
            <Field-line type="ranged"></field-line>
            <Field-line type="infantry"></field-line>

            <Field-line type="infantry"></field-line>
            <Field-line type="ranged"></field-line>
            <Field-line type="siege"></field-line>
        </div>
</template>

<script>
import fieldLine from './Field-line.vue'
export default {
  components: { FieldLine },

}
</script>

<style>

</style>