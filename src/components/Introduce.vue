<template>
    <div id='introduce'>
        <div class="bg"></div>
    </div>
</template>

<script>
    export default {

}

</script>

<style lang='scss' scoped>
    @import '../assets/scss/extend';
    
    #introduce{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        @include changeMode(dev);
        // @include changeMode(build);
    }
    .bg{
        @extend .mk;
        background-image: url('../assets/imgs/start-example.jpg');
        @extend .b-cover;
        z-index: -1;
    }
</style>
