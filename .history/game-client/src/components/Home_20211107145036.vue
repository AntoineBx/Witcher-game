<template>
    <div>HOME<hr>
    <label value="Name">Name</label>
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