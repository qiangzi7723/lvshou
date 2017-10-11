<template>
    <div class="hello">
        <video src="http://192.168.6.201:8000/index.mp4" id="video" x5-video-player-type="h5" webkit-playsinline="" x-webkit-airplay="true"
            airplay="allow" x5-video-player-fullscreen="false" playsinline="" preload="auto" :poster="require('@/assets/logo.png')" autoplay='true'></video>
        <div id='block'></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted() {

            this.initVideo();

            window.addEventListener("orientationchange", () => {
                var direction = this.getDeviceOrientation();
                console.log(direction, window.innerWidth);
            }, false);

            document.getElementById('block').addEventListener('click',()=>{
                console.log(23);
            })

        },
        methods: {
            initVideo(){
                this.video=document.getElementById('video');

                document.addEventListener("WeixinJSBridgeReady", function (){ 
                    this.video.play();
                    setTimeout(()=>{
                        this.video.pause();
                                            setTimeout(()=>{
                        this.video.play();
                    },1000)
                    },1000)
                }.bind(this), false)

                video.width=window.innerHeight;
                video.height=window.innerWidth;
                video.style.left=window.innerWidth+'px';
            },
            getDeviceOrientation() {
                return (typeof window.orientation) === "undefined" ? "undefined" : (window.orientation == 180 || window
                    .orientation == 0) ? "portrait" : "landscape";
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* video{
        width: 192px;
        height: 108px;
    }
    canvas{
    } */

    video {
        position: absolute;
        top: 0;
        object-fit: cover;
        background-size: cover;
        object-position: left top;
        transform-origin:0px 0px 0px;
        transform:rotate(90deg);
    }
    #block{
        position: absolute;
        top: 0;
        left: 100px;
        width: 100px;
        height: 100px;
        background: red;
        z-index: 99;
    }

</style>
