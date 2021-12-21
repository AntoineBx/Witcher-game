<template>
    <div>HOME<hr>
        <label value="Name">Nom de l'invité </label>
        <input ref="nameInput" type="text" v-model="playerName" @keyup.enter="validateWaitingList" >
        <button @click="validateWaitingList">Find game</button>
       <Game
    </div>
</template>
    
<script>
import Game from "./Game.vue";


export default {
    data() {
        return {
            playerName: "",
            inQueue: "",
        };
    },
    components: { Game },
    methods: {
        validateWaitingList() {
            if (this.playerName != "") {
                this.$socket.emit("joinGame", {
                    username: this.playerName,
                    img: "balec",
                    maxPlayers: 2
                });
            }
        }
    },
   
}
</script>

<style>

</style>