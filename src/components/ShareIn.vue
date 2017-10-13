<template>
    <div id='share-in'>
        <div class="bg"></div>
        <router-link to="/Loading" class='btn' tag='div'></router-link>
    </div>
</template>

<script>
    export default {

    }

</script>

<style lang='scss'>
    @import '../assets/scss/extend';
    #share-in {
        @include changeMode(dev);
        overflow: hidden;

        .bg {
            @extend .mk;
            background-image: url('../assets/imgs/shareIn-bg.jpg');
            @extend .b-cover;
            z-index: -1;
        }

        .btn{
            width: tr(264);
            height: tr(90);
            background-image: url('../assets//imgs/shareIn-btn.png');
            @extend .b-contain;
            margin: tr(962) auto 0;
        }
    }

</style>
