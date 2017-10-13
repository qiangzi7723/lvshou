<template>
    <div id="app">
        <transition name='fade'>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import './config/rem.js'
    export default {
        name: 'app',
        mounted() {
            window.lvshou = {};
        }
    }

</script>

<style lang='scss'>
    @import './assets/scss/extend';

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s
    }

    .fade-enter,
    .fade-leave-to{
        opacity: 0
    }

</style>
