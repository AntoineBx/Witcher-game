<template>

<div class="placeholder" ref="placeholder" :Width="CardWidth" :Height="CardHeight" >
    <div class="card-container" ref="currentContainer" :Width="CardWidth" :Height="CardHeight"  >
        <div class="net"/>
        <div class="card" ref="currentCard" @mousedown="triggerHoldClick" @mouseup="triggerReleaseClick">
            <img  class="backCard" src="@/assets/card/__main/cardback-wolf.webp" Width="100%" draggable="false" ondragstart="return false;" alt="">
            <img class="backupImg" :src='urlImgBackup' alt="">
            <div class="video">
                <video ref="videoRef"  id="video-container" @loadedmetadata="onVideoLoad"  loop muted Width="350px" Height="500px">

                </video>
            </div>
            <div class="border"><img src="@/assets/card/__main/border-gold.png" draggable="false" ondragstart="return false;" alt=""></div>
            <div class="glare"><div ref="currentGlare" class="glare-inner"></div></div>
            <div class="top-left">
                <div class="banner"><img src="@/assets/card/__main/banner.png" Width="100%"></div>
                <div class="rarity"><img src="@/assets/card/__main/rarity-epic.png" Width="100%"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
    
    export default {
        name: 'Card',
        el: "#app",
        components:{
		
        },
        props: {
            cardName: String,
            hidden: Boolean
        },
        data: function (){
            return{
                CardWidth : 122.5,
                CardHeight : 175,

                isHover : Boolean,
                isHolding : false,
                beginToHover : true,//For animation smoothness purpose only
                ticking : Boolean,
                setTimeOutFunc : Function, //usefull to store and then disable the SetTimeOut on mouseLeave
                placeholder : undefined,
                currentContainer : undefined,
                currentCard : undefined,
                glare : undefined,

                StoreLockPosition : { x : 0, y : 0},
                hiddenDegree : this.hidden ? 180 : 0,
            }
        },
        watch: {
            //Watch if Props Hidden has change
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
            }
        },
        computed: {
            urlImgBackup: function ()  {
                return  "/src/assets/card/"+this.cardName+"/"+this.cardName+".jpg";
            }
        },
        
        mounted: function(){
            this.$refs.videoRef.src = "/src/assets/card/"+this.cardName+"/"+this.cardName+".webm";
            if(!this.hidden){
                this.$refs.videoRef.play();
            }
            // Dom refs setup
            this.placeholder = this.$refs.placeholder;
            this.currentContainer = this.$refs.currentContainer;
            this.currentCard = this.$refs.currentCard;
            
            this.glare = this.$refs.currentGlare;
            if(this.hidden){
                this.placeholder.classList.add('hidden');
            }
         
            
            this.currentContainer.addEventListener('mousemove',(event)=> {
                this.requestTick(event);
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
                    this.$data.currentCard.style.transition =  "transform 5s, all 0.2s";
                }
                let scale = this.$data.isHolding? 80 : 150;
                // this.$data.currentCard.style.width = scale+"%"
                // this.$data.currentCard.style.height = scale+"%"
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
                        this.$data.currentContainer.style.transform = "translate("+moveX+"px,"+moveY+"px) "
                }


                this.$data.ticking = false;
            },

            onVideoLoad: function(event){
                event.target.classList.add('visible');
            },
            triggerHoldClick:function(event){
                if(!this.hidden){
                    this.$data.isHolding = true;
                    this.$data.placeholder.classList.add('isHolding');
                }
            },
            triggerReleaseClick:function(event){
                this.$data.isHolding = false;
                this.$data.placeholder.classList.remove('isHolding');
                if(true){// if release inside allowed space 
                    this.$data.currentContainer.style.transition = "transform 0.5s";
                    this.$data.currentContainer.style.transform = "translate("+this.$data.StoreLockPosition.x+"px,"+this.$data.StoreLockPosition.y+"px)"
                }
            },
        },
    }

</script>

<style lang="scss">
    @import "@/assets/scss/card.scss";  
</style>