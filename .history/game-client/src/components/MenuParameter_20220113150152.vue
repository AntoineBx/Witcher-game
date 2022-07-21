
<template>
 
  <div class="menu-parameter" :class=" open ? 'open' : '' ">
    <div class="arrow" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>
    </div>
    <div class="wrapper">
        <label class="volume">
            <input type="checkbox">
            <svg viewBox="0 0 108 96">
                <path d="M7,28 L35,28 L35,28 L59,8 L59,88 L35,68 L7,68 C4.790861,68 3,66.209139 3,64 L3,32 C3,29.790861 4.790861,28 7,28 Z"></path>
                <path d="M79,62 C83,57.3333333 85,52.6666667 85,48 C85,43.3333333 83,38.6666667 79,34 L49,3"></path>
                <path d="M95,69 C101.666667,61.6666667 105,54.3333333 105,47 C105,39.6666667 101.666667,32.3333333 95,25 L75.5,6 L49,33"></path>
            </svg>
            Music
        </label>
         <label class="volume">
            <input type="checkbox">
            <svg  height="50px" id="Layer_1" version="1.1" viewBox="0 0 50 50" width="50px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                
                <polygon fill="none" points="49,14 36,21 36,29   49,36 " stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"/>
                <path d="M36,36c0,2.209-1.791,4-4,4  H5c-2.209,0-4-1.791-4-4V14c0-2.209,1.791-4,4-4h27c2.209,0,4,1.791,4,4V36z"
                    fill="none" stroke="#000000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"
                />
            </svg>
            Video on Card
        </label>
    </div>
  </div>

</template>

<script>
export default {
    data: function (){
        return{
            open : false,
        }
    },
    methods: {
        toggleMenu: function(){
            this.open = !this.open
        },
        
    }
}
</script>

<style lang="scss">


</style>