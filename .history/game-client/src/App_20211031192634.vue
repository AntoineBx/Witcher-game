<template>
  <div>
    <div class="hand">
      <Card  folderName="iris"/>
      <Card  folderName="Avallach"/>
      <Card  folderName="ciri"/>

    </div>
  </div>
</template>
<script lang="ts">

import Card from "@/components/Card.vue"


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
      console.log("app init")
      // this.socket = io("http://localhost:5000"); //production
      // console.log(this.socket)
      
      // this.socket.on("totalPlayers", data => (this.totalPlayers = data));
      
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