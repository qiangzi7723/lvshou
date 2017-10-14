<template>
    <section id="loading">
        <div class='bg'></div>
        <section class='content'>
            <i></i>
            <section class='bar'>
                <div class='progress'></div>
            </section>
            <span>直播连接中...</span>
        </section>
    </section>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {
            this.proElm=$('.progress');
            this.load();
        },
        methods: {
            load() {
                // 加载图片资源
                // 所有需要加载的图片资源都写到这里来
                this.imgs = {
                    live: [require('@/assets/imgs/live-introduce.png'), require('@/assets/imgs/live-heart.png'),
                        require('@/assets/imgs/heart0.png'), require('@/assets/imgs/heart1.png'), require(
                            '@/assets/imgs/heart2.png')
                    ],
                    lottery: [require('@/assets/imgs/lottery-bg.jpg'), require('@/assets/imgs/lottery-btn.png')],
                    lotteryCallback: [require('@/assets/imgs/shu-bg.jpg'), require(
                        '@/assets/imgs/lottery-fail-btn.png'), require(
                        '@/assets/imgs/lottery-succeed-btn.png')]
                };

                var imgLoaded = false;
                var currentLoadedImg = 0;
                var totalImg = 0;
                var progress = 0;
                // 获取图片总长度
                for (var index in this.imgs) {
                    if (this.imgs[index] instanceof Array) {
                        // 说明是数组
                        totalImg += this.imgs[index].length;
                    } else {
                        // 说明不是数组
                        totalImg++;
                    }
                }
                for (var index in this.imgs) {
                    if (this.imgs[index] && this.imgs[index].indexOf("#") != 0) {
                        if (this.imgs[index] instanceof Array) {
                            // 说明当前是数组
                            for (var i = 0, len = this.imgs[index].length; i < len; i++) {
                                var img = new Image();
                                img.onload = img.onerror =  ()=> {
                                    ++currentLoadedImg;
                                    progress = currentLoadedImg / totalImg;
                                    if (currentLoadedImg == totalImg) {
                                        imgLoaded = true;
                                    }
                                    this.progressEvent(progress);
                                }
                                img.src = this.imgs[index][i];

                            }
                        } else {
                            //  说明不是数组
                            var img = new Image();
                            img.onload = img.onerror =  () =>{
                                ++currentLoadedImg;
                                progress = currentLoadedImg / totalImg
                                if (currentLoadedImg == totalImg) {
                                    imgLoaded = true;
                                }
                                this.progressEvent(progress);
                            }
                            img.src = this.imgs[index];
                        }
                    } else {
                        // 说明不是图片地址，而是纯色
                        totalImg--;
                    }
                };
            },
            progressEvent(p){
                // 进度条事件
                this.proElm.width(p*100+'%');
                if(p==1){
                    setTimeout(()=>{
                        this.$router.push('Live');
                    },2000);
                }
            }
        }
    }

</script>

<style lang='scss'>
    @import '../assets/scss/extend';
    #loading {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        @include changeMode(dev); // @include changeMode(build);
        .bg {
            @extend .mk;
            background-image: url('../assets/imgs/loading-bg.jpg');
            z-index: -1;
        }
        .content {
            font-size: tr(35);
            color: #fff;
            text-align: center;
            i {
                display: block;
                width: tr(95);
                height: tr(100);
                margin: 0 auto;
                @extend .b-contain;
                background-image: url('../assets/imgs/loading-run.png');
            }
            span {
                display: block;
            }
            .bar {
                width: tr(501);
                height: tr(32);
                border: 1px solid #fff;
                margin: tr(10) auto tr(17);
                display: flex;
                align-items: center;
                padding: 0 tr(6);
                box-sizing: border-box;
            }
            .progress{
                height: tr(18);
                width: 0%;
                background-color: #fff;
            }
        }
    }

</style>
