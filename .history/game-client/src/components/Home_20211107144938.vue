<template>
    <div>

    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateRoomCreation">

    </div>
</template>
    
<script>


export default {
    data() {
      return {
        playerName : String
      }
    },
    components:{

    }
}
</script>

<style>

</style>