<template>
    <section id='lottery-fail'>
        <callbackComponent :title='title' :detail='detail' :tip='tip' :logo='logo' :btn='btn' v-on:callback='failCb'></callbackComponent>
        <!-- <shareComponent></shareComponent> -->
    </section>
</template>

<script>
    import callbackComponent from '@/components/childComponents/LotteryCallback.vue';
    import shareComponent from '@/components/childComponents/Share.vue';
    export default {
        data() {
            return {
                title: '很遗憾，没有获奖',
                detail: '很遗憾，没有获得奖品。不要气馁，可以换个手机号试试哦~',
                tip: '(每个手机号码每天可都有一次抽奖的机会)',
                logo: require('@/assets/imgs/lottery-fail-logo.png'),
                btn: require('@/assets/imgs/lottery-fail-btn.png')
            }
        },
        components: {
            callbackComponent,
            shareComponent
        },
        methods:{
            failCb(){
                console.log('fail');
            }
        }
    }

</script>

<style lang='scss'>
    @import '../assets/scss/extend';
    #lottery-fail {
        overflow: hidden;
    }

</style>
