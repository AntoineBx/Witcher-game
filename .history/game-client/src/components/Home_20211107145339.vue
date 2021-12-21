<template>
    <div>HOME<hr>
    <label value="Name">Name</label>
    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateRoomCreation" >
    <button @click="validateRoomCreation">Find game</button>
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