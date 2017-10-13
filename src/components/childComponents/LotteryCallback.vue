<template>
    <section id="lottery-callback">
        <div class='bg'></div>
        <section class='content'>
            <h1>{{title}}</h1>
            <div class="logo" :style='{ "background-image":"url("+logo+")" }'></div>
            <div class="describe" v-show=describe>{{describe}}</div>
            <div class='detail'>{{detail}}</div>
            <div class='tip'>{{tip}}</div>
            <div class='play-btn' :style='{ "background-image":"url("+btn+")" }' @click='cb'></div>
        </section>
    </section>
</template>

<script>
    export default {
        props:['title','describe','detail','tip','logo','btn'],
        methods:{
            cb(){
                // 执行父事件
                this.$emit('callback');
            }
        }
    }

</script>

<style lang='scss'>
    @import '../../assets/scss/extend.scss';
    #lottery-callback {
        overflow: hidden;
        .bg {
            @extend .mk;
            background-image: url('../../assets/imgs/shu-bg.jpg');
            @extend .b-cover;
            z-index: -1;
        }
        .content {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            color: #fff;
        }
        h1 {
            width: 100%;
            text-align: center;
            margin-top: tr(143);
            margin-bottom: tr(56);
            font-size: tr(50);
        }
        .logo {
            width: tr(237);
            height: tr(237);
            @extend .b-contain;
        }
        .describe{
            position: absolute;
            top: tr(551);
            font-size: tr(34);
        }
        .detail{
            margin-top: tr(117);
            margin-bottom: tr(63);
            font-size: tr(29);
            width: tr(580);
        }
        .tip{
            font-size: tr(28);
            margin-bottom: tr(161);
        }
        .play-btn{
            width: tr(265);
            height: tr(90);
            @extend .b-contain;
        }
    }

</style>
