<template>
<div class="wrapper-button">
    <button class="button-pass" @click="passed"  :class=" hidden ? 'hidden' : '' " >
        <img class="backgroundBack" src="@/assets/board/jetonBack.png" draggable="false" ondragstart="return false;" alt="">
        <img class="backgroundFaced" src="@/assets/board/jetonFace.png" draggable="false" ondragstart="return false;" alt="">
        <div>
            PASS
        </div>
    </button>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_PLAYER_TURN } from '@/store/modules/board/mutations'
export default {
    data: function (){
      return{
      }
    },
    computed: {
        ...mapState('board',{
            player: state => state.player,
            playerTurn: (state) =>{
                return state.playerTurn == state.player ? true : false;
            },
            hasPassed: (state) =>{
                return state['passed'+state.player]
            }
        }),
        hidden :function(){
            if(this.hasPassed || !this.playerTurn){
                return true;
            }
            return false
        }
    },
    methods: {
        ...mapMutations('board',[
            UPDATE_PLAYER_TURN,
        ]),
        passed :function(){
            if(!this.hidden){
                this[UPDATE_PLAYER_TURN](0)
                this.$socket.emit("passed", this.player);
            }
            
        }
    },
    
}
</script>

<style lang="scss">
.wrapper-button{
    
    .button-pass{
        padding: 40px;
        border-radius: 50%;
        transform: rotateY(0deg);
        transition: transform 0.3s;
        background-color: black;
        border: none;
        transform-style: preserve-3d;
        &:active{
            border-style: none;
        }
        
        &.hidden{
            transform: rotateY(180deg);
        }
        
        &>div{
            position: absolute;
            color : white;
            font-family: 'GWENT';
            font-size: 20px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        img{
            position: absolute;
            top:0; bottom:0;left:0;right: 0;
            width: 100%;
            height: 100%;
            &.backgroundBack{
                transform: translateZ(-1px);
            }
        }
    }
    &:hover{
         .button-pass:not(.hidden){
            transform: translateZ(30px);
         }
    }
}

</style>