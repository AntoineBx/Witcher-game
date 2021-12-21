<template>
    <div>HOME<hr>

    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateRoomCreation" >

    </div>
</template>
    
<script>


export default {
    data() {
      return {
        playerName : ""
      }
    },
    components:{

    }
}
</script>

<style>

</style>