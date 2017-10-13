<template>
    <section id='lottery-succeed'>
        <callbackComponent :title='title' :detail='detail' :tip='tip' :logo='logo' :btn='btn' :describe='describe' v-on:callback='succeedCb'></callbackComponent>
    </section>
</template>

<script>
    import callbackComponent from '@/components/childComponents/LotteryCallback.vue';
    export default {
        data() {
            return {
                title: '获得奖品',
                detail: '领取方式：点击下方"立即领取"按钮，进入下载APP页面。下载APP并进入APP领取即可领得奖品。',
                describe:'ofo月卡',
                tip: '(每个手机号码每天可都有一次抽奖的机会)',
                logo: require('@/assets/imgs/gift.png'),
                btn: require('@/assets/imgs/lottery-succeed-btn.png')
            }
        },
        components: {
            callbackComponent
        },
        methods:{
            succeedCb(){
                console.log('succeed');
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
