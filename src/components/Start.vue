<template>
    <div id='start'>
        <div class="bg"></div>
    </div>
</template>

<script>
    export default {

}

</script>

<style lang='scss' scoped>
    @import '../assets/scss/extend';
    
    #start{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        @include changeMode(dev);
        // @include changeMode(build);
    }

</style>
