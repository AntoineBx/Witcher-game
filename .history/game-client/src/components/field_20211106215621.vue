<template>
  <div class="field">
      <div class="lines">
            <FieldLine type="siege" :side="false" />
            <FieldLine type="ranged" :side="false" />
            <FieldLine type="infantry" :side="false" />

            <FieldLine type="infantry" :side="true" />
            <FieldLine type="ranged" :side="true" />
            <FieldLine type="siege" :side="true" />
        </div>
    </div>
</template>

<script>
import FieldLine from "@/components/FieldLine.vue"

export default {
    components: { FieldLine },
}
</script>

<style lang="scss">

.field{
   
    .lines{
        display: flex;
        width: 624px;
        flex-wrap: wrap;
        justify-content: center;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        .line{
                width: 624px;
                height: 100px;
                box-shadow: 0px 10px 13px 0px #000000;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                margin-bottom: 6px;
                &.siege{
                    background-image: url("../assets/board/siege-field.jpg");
                }
                &.ranged{
                    background-image: url("../assets/board/ranged-field.jpg");
                }
                &.infantry{
                    background-image: url("../assets/board/infantry-field.jpg");
                }
            }
    }
    
}
</style>