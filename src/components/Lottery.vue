<template>
    <div id='lottery'>
        <div class="bg"></div>
        <section class='content'>
            <h3>抽奖规则</h3>
            <h4>1、跟好友一起瘦</h4>
            <div class='detail'>动动手指，点击右上角把幸运分给好友。让好友跟你一起变</div>
            <h4>2、填写手机验证码</h4>
            <div class='detail'>填写手机验证码，通过验证即可进行抽奖啦！</div>
            <h6>每个玩家每日都有一次抽奖机会哦~</h6>
            <input type="text" class='ipt' placeholder="输入手机号" v-model='phone'>
            <div class='btn' @click='play'></div>
            <dialogComponent :title='dialogTitle' :show='dialogShow'></dialogComponent>
        </section>
    </div>
</template>

<script>
    import dialogComponent from '@/components/childComponents/Dialog.vue'

    export default {
        data() {
            return {
                phone: null,
                dialogTitle: '',
                dialogShow: false
            }
        },
        methods: {
            play() {
                // 验证手机号码格式是否正确
                if (!this.validate()) return;
                // 开始抽奖
                this.lottery();
            },
            validate() {
                // 简单验证 判断是否数字 以及 号码长度 不作正则验证

                let phone = +this.phone; //转成纯数字 如果数字中混杂字母会转成NaN
                // if(phone.toString().length==11){
                if (phone.toString().length == 1) {
                    return true;
                } else {
                    // 手机格式不正确 弹出提示框
                    this.dialogShow = true;
                    this.dialogTitle = '输入正确的手机号';
                    setTimeout(() => {
                        this.dialogShow = false;
                    }, 1000);
                }
            },
            lottery() {
                if (this.phone == 1) {
                    // 已经抽过奖
                    this.dialogShow = true;
                    this.dialogTitle = '此号码已抽过奖';
                    setTimeout(() => {
                        this.dialogShow = false;
                    }, 1000);
                } else if (this.phone == 2) {
                    // 抽奖失败
                } else {
                    // 抽奖成功
                }
            }
        },
        components: {
            dialogComponent
        }
    }

</script>

<style lang='scss' scoped>
    @import '../assets/scss/extend';

    #lottery {
        position: relative;
        @include changeMode(dev); // @include changeMode(build);
        overflow: hidden;

        .bg {
            @extend .mk;
            background-image: url('../assets/imgs/lottery-bg.jpg');
            @extend .b-cover;
            z-index: -1;
        }
        .content {
            margin-top: tr(451);
            font-size: tr(26);
            color: #fff;
        }
        h3,
        h6 {
            text-align: center;
        }
        h3 {
            font-size: tr(32);
        }
        h4 {
            position: relative;
            left: tr(172);
            font-size: tr(27);
            margin: tr(12) 0;
        }
        .detail {
            width: tr(376);
            margin: 0 auto;
            padding-bottom: tr(12);
        }
        h6 {
            font-size: tr(21);
            margin-top: tr(8);
        }
        .ipt {
            display: block;
            box-sizing: border-box;
            margin: tr(45) auto tr(70);
            width: tr(534);
            height: tr(64);
            padding-left: tr(16);
            font-size: tr(33);
            outline: none;
        }
        .btn {
            width: tr(265);
            height: tr(92);
            margin: 0 auto;
            background-image: url('../assets/imgs/lottery-btn.png');
            @extend .b-contain;
        }
    }

</style>
