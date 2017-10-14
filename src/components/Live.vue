<template>
    <div id="live">
        <video src="http://static.cdn.24haowan.com/cdn/leon/json/index.mp4" id="video" x5-video-player-type="h5" webkit-playsinline="" x-webkit-airplay="true"
            airplay="allow" x5-video-player-fullscreen="false" playsinline="" preload="auto" :poster="require('@/assets/imgs/start-example.jpg')"></video>
        <section id='live-wrap'>
            <div class='play-btn'>
                <i></i>
            </div>
            <section class='content'>
                <div class="introduce"></div>
                <section class='danmu-show'>
                    <div class='danmu'>
                        <span v-for='line in danmu' :class='line.type=="comment"?"comment":"enter"'>
                            {{line.content}}
                        </span>
                    </div>
                </section>

            </section>
            <div class='heart'>
            </div>
            <vue-partical :isParticle="isParticle"></vue-partical>
        </section>
    </div>
</template>

<script>
    import {
        setTranslate
    } from '../config/util.js';
    import VuePartical from '@/components/childComponents/Particle.vue'

    export default {
        data() {
            return {
                danmu: [{
                    content: '东东：邢傲伟好帅！！！',
                    type: 'comment'
                }, {
                    content: 'Max：奥运冠军好帅！！！',
                    type: 'comment'
                }, {
                    content: '冬瓜Dong 进入直播间',
                    type: 'enter'
                }, {
                    content: '小仙女：听说在好享瘦能和你交流',
                    type: 'comment'
                }, {
                    content: 'Angel 进入直播间',
                    type: 'enter'
                }, {
                    content: '东东：邢傲伟好帅！！！',
                    type: 'comment'
                }, {
                    content: 'Max：奥运冠军好帅！！！',
                    type: 'comment'
                }, {
                    content: '冬瓜Dong 进入直播间',
                    type: 'enter'
                }, {
                    content: '小仙女：听说在好享瘦能和你交流',
                    type: 'comment'
                }, {
                    content: 'Angel 进入直播间',
                    type: 'enter'
                }, {
                    content: '东东：邢傲伟好帅！！！',
                    type: 'comment'
                }, {
                    content: 'Max：奥运冠军好帅！！！',
                    type: 'comment'
                }, {
                    content: '冬瓜Dong 进入直播间',
                    type: 'enter'
                }, {
                    content: '小仙女：听说在好享瘦能和你交流',
                    type: 'comment'
                }, {
                    content: 'Angel 进入直播间',
                    type: 'enter'
                }],
                danmuTop: 0,
                isPlaying: false,
                heartTimer: null,
                isParticle:false
            }
        },
        mounted() {

            this.initVideo();

            window.addEventListener("orientationchange", () => {
                var direction = this.getDeviceOrientation();
                console.log(direction, window.innerWidth);
            }, false);


        },
        methods: {
            initVideo() {

                video.width = window.innerHeight;
                video.height = window.innerWidth;
                video.style.left = window.innerWidth + 'px';

                this.initVideoEvent();

            },
            initVideoEvent() {
                this.video = document.getElementById('video');
                this.touchBtn = document.getElementsByClassName('play-btn')[0];

                this.touchBtn.addEventListener('touchstart', (e) => {
                    e.preventDefault()
                    this.playEvent();
                })

                // 待修改 安卓上第一次播放会跳到播放器，此时已经执行了touchend事件，导致之后的touchend事件没能正常执行
                this.touchBtn.addEventListener('touchend', () => {
                    this.stopEvent();
                })
                
                this.video.addEventListener('ended',()=>{
                    // 视频播放完毕 跳转到抽奖页面
                    this.$router.push('Lottery');
                })

            },
            playEvent() {
                this.video.play();
                this.isPlaying = true;
                this.isParticle=true;
                this.startDanmuAnimation();
                // this.startHeartAnimation();
            },
            stopEvent() {
                this.video.pause();
                this.isPlaying = false;
                this.isParticle=false;
                // this.stopHeartAnimation();
            },
            startHeartAnimation() {
                if (this.heartTimer) return;
                const heart = $('.heart');
                // 动画的区间介于 0.2rem-0.6rem
                this.heartTimer = setInterval(() => {
                    let l = Math.random() * 0.4 + 0.2;
                    heart.append('<i style="right:' + l + 'rem"></i>');
                }, 100);
            },
            stopHeartAnimation() {
                clearInterval(this.heartTimer);
                this.heartTimer = null;
            },
            startDanmuAnimation() {
                const elm = document.getElementsByClassName('danmu')[0];
                const fn = () => {
                    if (!this.isPlaying) return;
                    this.danmuTop--;
                    setTranslate(elm, 0, this.danmuTop, 0);
                    window.requestAnimationFrame(fn);
                }
                fn();
            },
            getDeviceOrientation() {
                return (typeof window.orientation) === "undefined" ? "undefined" : (window.orientation == 180 || window
                    .orientation == 0) ? "portrait" : "landscape";
            }
        },
        components: {
            VuePartical
        },
    }

</script>

<style lang='scss'>
    @import '../assets/scss/extend';

    #live-wrap {
        position: relative;
        // @include changeMode(dev); 
        @include changeMode(build);
        .play-btn {
            width: tr(123);
            height: tr(123);
            position: absolute;
            right: tr(46);
            bottom: tr(36);
            background-color: rgba(0, 0, 0, 0.5);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
            i {
                width: tr(71);
                height: tr(62);
                background-image: url('../assets/imgs/live-heart.png');
                @extend .b-contain;
            }
        }

        .content {
            position: absolute;
            top: tr(17);
            left: tr(13);
        }

        .introduce {
            width: tr(487);
            height: tr(128);
            background-image: url('../assets/imgs/live-introduce.png');
            @extend .b-contain;
        }

        .danmu-show {
            height: tr(280);
            overflow: hidden;
        }

        .danmu {
            margin-top: tr(8);
            margin-left: tr(16);
            font-size: tr(20);
            color: #fff;
            display: flex;
            flex-wrap: wrap;
            width: tr(400);
        }

        .danmu-common {
            padding: tr(10);
            margin-bottom: tr(10);
        }

        .comment {
            @extend .danmu-common;
            background-color: rgba(0, 73, 169, 0.5);
            border-radius: tr(15);
        }

        .enter {
            @extend .danmu-common;
            padding: 0;
            padding-left: tr(10);
            color: #ef1819;
        }

        .heart {
            i {
                width: tr(71);
                height: tr(62);
                position: absolute;
                right: tr(46);
                bottom: tr(76);
                background-image: url('../assets/imgs/live-heart.png');
                @extend .b-contain;
                animation: sendHeart .8s forwards;
            }

            @keyframes sendHeart {
                0% {
                    transform: scale(0.5);
                }
                100% {
                    opacity: 0;
                    transform: scale(1) translate3d(0, -200px, 0);
                }
            }
        }
    }

    video {
        position: absolute;
        top: 0;
        object-fit: cover;
        background-size: cover;
        object-position: center center;
        transform-origin: 0px 0px 0px;
        transform: rotate(90deg);
    }

</style>
