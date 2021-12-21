<template>
    <div>HOME<hr>
    <label value="Name">Nom de l'invité </label>
    <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateRoomCreation" >
    <button @click="validateWaitingList">Find game</button>
    </div>
</template>
    
<script>
import io from "socket.io-client";

export default {
    data() {
      return {
        playerName : ""
      }
    },
    components:{

    },
    methods:{
        validateWaitingList(){
            if(this.playerName != ""){
                
            }
        }
    }
}
</script>

<style>

</style>