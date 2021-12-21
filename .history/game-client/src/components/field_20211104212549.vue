<template>
  <div class="field">
      <div class="lines">
            <FieldLine type="siege"/>
            <FieldLine type="ranged"/>
            <FieldLine type="infantry"/>

            <FieldLine type="infantry"/>
            <FieldLine type="ranged"/>
            <FieldLine type="siege"/>
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
    display: flex;
    width: 80%;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    .lines{
        .line{
                width: 100%;
                height: 100px;
                box-shadow: 0px 10px 13px 0px #000000;
                background-size: contain;
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