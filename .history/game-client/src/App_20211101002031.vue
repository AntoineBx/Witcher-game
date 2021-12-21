<template>
  <div>
    <div class="hand">
      <div class="totalPlayer">{{totalPlayers}}</div>
      <Card  folderName="iris"/>
      <Card  folderName="Avallach"/>
      <Card  folderName="ciri"/>

    </div>
  </div>
</template>
<script lang="ts">

import Card from "@/components/Card.vue"
import io from "socket.io-client";

  export default {
    data() {
      return {
        socket: {},
        totalPlayers : 0,
      };
    },
    components:{
		  Card
    },
    created() {
      
    let socket = io("http://localhost:5000"); 
      
    this.socket.on("totalPlayers", data => (this.totalPlayers = data));
      
    },
    mounted: function() {
      
    },
    updated: function(){
      console.log(this.totalPlayers)
    }
  }


</script>


<style lang="scss">
@import "@/assets/scss/main.scss";  
.hand{
  display: flex;
  flex-wrap: nowrap;
  
  justify-content: center;
  margin-top: 100px;
}


</style>