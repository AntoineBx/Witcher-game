<template>

<div class="placeholder" :class="[holdingClass ?'isHolding':'' , statusClass]" ref="placeholder" :Width="CardWidth" :Height="CardHeight" :style="{zIndex : zindex}" >
    <div class="card-container" ref="currentContainer" :Width="CardWidth" :Height="CardHeight"  >
        <div class="net"/>
        <div class="card" ref="currentCard" @mousedown="triggerHoldClick" @mouseup="triggerReleaseClick">
            <img  class="backCard" src="@/assets/card/__main/cardback-wolf.webp" Width="100%" draggable="false" ondragstart="return false;" alt="">
            <img class="backupImg" :src='urlImgBackup' alt="">
            <div class="video">
                <video ref="videoRef"  id="video-container" :src="urlVideo" @canplay="onVideoLoad"  loop muted Width="350px" Height="500px">
                </video>
            </div>
            <div class="border"><img :src='borderImg' draggable="false" ondragstart="return false;" alt=""></div>
            <div class="glare"><div ref="currentGlare" class="glare-inner"></div></div>
            <div class="top-left">
                <div class="banner"><img src="@/assets/card/__main/banner.png" Width="100%"> <img class="power" :src="powerImg" Width="100%"></div>
                <div class="rarity"><img :src="rarityImg" Width="100%" Height="100%"></div>
            </div>
            <div class="abilitie"> <img :src="abilitie" Width="100%" Height="100%"> </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import CardsList from "../../../../data/cards.json";
import { REMOVE_CARD_STATE, SET_HOLDING, SET_MOUSE_POS_ON_RELEASE,SET_WAS_HOLDING,UPDATE_CARD_STATE_COORD } from "@/store/modules/board/mutations";
import { mapGetters,mapState, mapMutations } from 'vuex'
import { OPEN_POPUP } from "@/store/modules/popupCard/mutations";
 
    export default {
        name: 'Card',
        el: "#app",
        components:{
		
        },
        props: {
            cardName: String,
            cardProps: {},
            hidden: Boolean,
            unmovable : Boolean
        },
        data: function (){
            return{
                JsonCards: CardsList,
                
                CardData :{ //get overwrite by SetCardData
                    name:"",
                    folderName:"",
                    power: "1",
                    rarity: "0",
                    border:"bronze",
                    banner : "default",
                    positioning: ["infantry","ranged","siege"],
                    description : "",
                },
                CardWidth : 122.5,
                CardHeight : 175,
                isUnmovable : true,
                isHover : Boolean,
                holdingClass : false,
                isHolding : false,
                beginToHover : true,//For animation smoothness purpose only
                ticking : Boolean,
                setTimeOutFunc : Function, //usefull to store and then disable the SetTimeOut on mouseLeave
                placeholder : undefined,
                currentContainer : undefined,
                currentCard : undefined,
                glare : undefined,
                hiddenDegree : this.hidden ? 180 : 0,
                StoreLockPosition : { x : 0, y : 0},
                status : [],
                zindex : 10,
            }
        },
        watch:{
            '$store.state.board.triggercardsState': function() {
               
                let cardState = this.$store.state.board.cardsState[this.cardProps.id]
                if( cardState == undefined ) return;
                this.StoreLockPosition = cardState?.coord == undefined ? { x : 0, y : 0} : cardState.coord
                this.status = cardState.status
                let newZindex = cardState?.zindex
                if(newZindex != undefined){
                    if(this.$store.state.board.player == 2){
                        newZindex = Math.abs( newZindex - 5 )
                    }
                    this.zindex = newZindex
                }else{
                    this.zindex = 1
                }
               
            },
            '$store.state.board.playerTurn': function() {
                console.log("Player Turn Change");
                //If that is the player's turn unlock card
                if(this.$store.state.board.playerTurn == this.$store.state.board.player && !this.unmovable){
                    this.isUnmovable = false;
                }else{
                    this.isUnmovable = true;
                }
            },
            cardName: function() {
                this.SetCardData();
            },
            //transform coord on the page to css translate() coord
            StoreLockPosition(){
                if(this.$refs.currentContainer != undefined){
                    let startX = this.$refs.placeholder.getBoundingClientRect().left
                    let startY = this.$refs.placeholder.getBoundingClientRect().bottom
                    let endX = this.$data.StoreLockPosition.x
                    let endY = this.$data.StoreLockPosition.y
                    let translateX = endX-startX
                    let translateY = endY-startY
                    this.StoreLockPosition.x = translateX
                    this.StoreLockPosition.y = translateY
                    this.$refs.currentContainer.style.transform = "translate("+this.$data.StoreLockPosition.x+"px,"+this.$data.StoreLockPosition.y+"px)"    
                }
            },
            hidden(){
                if(this.hidden){
                    this.hiddenDegree = 180 
                    this.$refs.placeholder.classList.add('hidden');
                    this.$refs.currentCard.style.transform = ""
                    
                    setTimeout(() => {
                        this.$refs.videoRef.pause();
                    }, 200);
                    
                }else{
                    this.hiddenDegree = 0
                    this.$refs.placeholder.classList.remove('hidden'); 
                    this.$refs.currentCard.transform = ""
                    this.$refs.videoRef.play();
                }
            },
        },
        computed: {
            ...mapState('board',{
                holding: state => state.holding,
            }),
            urlVideo : function(){
                return "/src/assets/card/"+this.CardData.folderName+"/"+this.CardData.folderName+".webm"
            },
            urlImgBackup: function ()  {
                return  "/src/assets/card/"+this.CardData.folderName+"/"+this.CardData.folderName+".jpg";
            },
            powerImg : function(){
                
                if(this.cardProps.power != -1){
                    return "/src/assets/misc/number/white/"+this.cardProps.power+".png";
                }else{
                    return "/src/assets/card/__main/trinket.png";
                }
                
            },
            // transform Status data into css class 
            statusClass: function(){
                if(this.status != undefined){
                    let ret = ""
                    this.status.map(element=>{
                       ret += element+' ';
                    })
                    return ret
                }else{
                    return ""
                }
            },
            borderImg: function ()  {
                let url = "border-bronze.png"
                if(this.CardData.border == "bronze"){
                    url = "border-bronze.png"
                }else if(this.CardData.border == "gold"){
                    url = "border-gold.png"
                }
                return  "/src/assets/card/__main/"+url;
                
            },
            rarityImg: function ()  {
                let url = "border-bronze.png"

                url =   this.CardData.rarity == 3 ? "rarity-legendary.png" :
                        this.CardData.rarity == 2 ? "rarity-epic.png" : 
                                                    "rarity-common.png" ;
                return  "/src/assets/card/__main/"+url;
            },
            abilitie : function(){
                let ret =  "/src/assets/card/__main/abilities/no_abilitie.png";
                let abilities = ['scorch','spy','bond']
                if(this.cardProps.abilities != undefined){
                    Object.keys(this.cardProps.abilities).forEach(abilitie=>{
                        if(abilities.includes(abilitie)){
                            ret = "/src/assets/card/__main/abilities/"+abilitie+".png"
                        }
                        
                    })
                }
                
                return  ret;
            }
        },
        created: function(){
            this[UPDATE_CARD_STATE_COORD]({ idCard : this.cardProps.id , coord:{x:0,y:0}})
            this.SetCardData();
           
            this.isUnmovable = true
        },
        mounted: function(){
            // this.$refs.videoRef.src = "/src/assets/card/"+this.CardData.folderName+"/"+this.CardData.folderName+".webm";
            
            // Dom refs setup
            this.placeholder = this.$refs.placeholder;
            this.currentContainer = this.$refs.currentContainer;
            this.currentCard = this.$refs.currentCard;
            this.glare = this.$refs.currentGlare;
            
            if(this.hidden){
                this.placeholder.classList.add('hidden');
            }
            if(!this.hidden){
                this.$refs.videoRef.play();
            }
            this.currentContainer.addEventListener('mousemove',(event)=> {
                this.requestTick(event);
                if(this.isHolding){
                    this.holdingClass = true;
                }else{
                    this.holdingClass = false;
                }
            })
            this.currentContainer.addEventListener("mouseenter",(event)=>{
                this.isHover = true;
                this.ticking = false;
                this.currentCard.style.transition =  "all 0.2s ease-out";
                this.glare.style.transition=  "opacity 0.1s";
                this.$data.setTimeOutFunc = setTimeout(() => {
                    this.beginToHover = false;
                }, 400);
            })
            
            this.currentContainer.addEventListener("mouseleave",(event)=> {
                clearTimeout(this.$data.setTimeOutFunc);
                this.isHover = false;
                this.beginToHover = true;
                this.$data.placeholder.classList.remove('hovered');
                this.currentCard.style.transition =  "transform 0.5s,all 0.2s";
                this.currentCard.style.transform = "";
                this.currentCard.style.width = "";
                this.currentCard.style.height = "";
                this.$data.glare.style.transition=  "opacity 0.8s";
                this.$data.glare.style.opacity = 0;
            })
        },

        methods: {
            ...mapMutations('board',[
                SET_HOLDING,
                SET_MOUSE_POS_ON_RELEASE,
                SET_WAS_HOLDING,
                UPDATE_CARD_STATE_COORD,
                REMOVE_CARD_STATE
            ]),
            ...mapMutations('popupCard',[
                OPEN_POPUP
            ]),
            
            //Go fetch Data of the card from the Json
            SetCardData:function(){
                const currentCard = this.JsonCards.cards[this.cardName]
                if(currentCard == undefined){
                    console.error("Props CardName not found in the Json ")
                    return;
                }
                this.CardData = currentCard; 
            },

//-----ANIMATION------//
            requestTick : function(event){
                if(this.$data.ticking) return
                requestAnimationFrame(()=>{this.updateTransforms(event)})
                this.$data.ticking = true;
            },
            updateTransforms : function(event){
                let mousePosX = event.pageX - this.$data.currentCard.getBoundingClientRect().left;
                let mousePosY = event.pageY - this.$data.currentCard.getBoundingClientRect().top;
                
                let rotateY = (mousePosY-(this.$data.currentCard.offsetHeight*1.05/2))*0.1;
                let rotateX = -(mousePosX-(this.$data.currentCard.offsetWidth*1.05/2))*0.1;
                let angle = Math.atan2(rotateY,rotateX)*(180/Math.PI);
                let opacity = Math.abs((rotateY+(-rotateX)))/130

                // console.log(Math.round(rotateY),Math.round(-rotateX))
                if(this.$data.beginToHover == false){//change transition speed after 1sec of entering card
                    this.$data.currentCard.style.transition =  " all 0.2s ease-out, transform 0.05s";
                }
                let scale = this.$data.isHolding? 80 : 150;
                this.$data.currentCard.style.transform = "rotateX("+rotateY+this.hiddenDegree+"deg) "+"rotateY("+(rotateX+this.hiddenDegree)+"deg) ";
                this.$data.placeholder.classList.add('hovered');

                this.$data.glare.style.transform = "translate(-50%, -50%) rotate("+angle+"deg)";
                this.$data.glare.style.opacity = opacity;
                

                //Holding for moving transform
                if(this.$data.isHolding){
                        //calcul the center of the card you hold
                        let centerX = this.$data.placeholder.getBoundingClientRect().left+(this.$data.currentContainer.getBoundingClientRect().width/2);
                        let centerY = this.$data.placeholder.getBoundingClientRect().top+(this.$data.currentContainer.getBoundingClientRect().height/2);
                        let moveX = event.clientX - centerX;
                        let moveY = event.clientY - centerY;
                        this.$data.currentContainer.style.transition = "transform 0.04s";
                        this.$data.currentContainer.style.transform = "translate("+moveX+"px,"+moveY+"px)"
                }
                this.$data.ticking = false;
            },
//------------------//

            onVideoLoad: function(event){
                event.target.classList.add('visible');
                event.target.play();
            },
            triggerHoldClick:function(event){
                if(!this.isUnmovable && !this.status?.includes('onField') ){
                    //if left click
                    if(event.which == 1){
                        if(!this.hidden){
                            this.$data.isHolding = true;
                            this[SET_HOLDING]({uuid : this.cardProps.id, positioning : this.CardData.positioning });
                        }
                    }
                }
            },
            triggerReleaseClick:function(event){
                if(!this.isUnmovable){
                    this.$data.isHolding = false;
                    this[SET_HOLDING](false);
                    this[SET_WAS_HOLDING](this.cardProps.id);
                    this[SET_MOUSE_POS_ON_RELEASE]({ x : event.pageX,y : event.pageY });
                    
                    if(true){// if release inside allowed space 
                        this.$data.currentContainer.style.transition = "transform 0.5s";
                        this.$data.currentContainer.style.transform = "translate("+this.$data.StoreLockPosition.x+"px,"+this.$data.StoreLockPosition.y+"px)"
                    }
                }
                //Open Popup if Right click
                if(event.which == 3){
                    if(!this.hidden){
                        this[OPEN_POPUP](this.CardData.folderName)
                    }
                }
            },
            
        },
        beforeDestroy : function(){
            this[REMOVE_CARD_STATE](this.cardProps.id)
        }
    }

</script>

<style lang="scss" >
    @import "@/assets/scss/card.scss";  
</style>