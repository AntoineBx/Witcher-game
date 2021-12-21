<template>
  <div class="field">
            <Field-line type="siege"/>
            <Field-line type="ranged"/>
            <Field-line type="infantry"/>

            <Field-line type="infantry"/>
            <Field-line type="ranged"/>
            <Field-line type="siege"/>
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