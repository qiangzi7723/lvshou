<template>
    <section id="loading">
        <div class='bg'></div>
        <section class='content'>
            <i></i>
            <section class='bar'></section>
            <span>直播连接中...</span>
        </section>
    </section>
</template>

<script>
    export default {
        data() {
            return {}
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
            }
        }
    }

</style>
