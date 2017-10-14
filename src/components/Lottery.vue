<template>
    <div id='lottery'>
        <div class="bg"></div>
        <section class='content'>
            <h3>抽奖规则</h3>
            <h4>1、跟好友一起瘦</h4>
            <div class='detail'>动动手指，点击右上角把幸运分给好友。让好友跟你一起变</div>
            <h4>2、填写手机号</h4>
            <div class='detail'>填写手机号码，成功提交即可进行抽奖啦！</div>
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
                dialogShow: false,
                key: 'sgn666@#!hxs',
                gift: null,
                gift_id: '',
                giftName: '',
                giftUrl: ''
            }
        },
        mounted() {
            this.initGift();
        },
        methods: {
            initGift() {
                $.ajax({
                    url: 'http://api.24haowan.com/gift?game_id=14',
                    type: 'get',
                    success: (data) => {
                        data = JSON.parse(data);
                        this.gift = data.msg;
                        // 划分礼物的随机区间
                        let sum = 0;
                        for (let i = 0, len = this.gift.length; i < len; i++) {
                            this.gift[i].chanceStart = sum;
                            sum += (+this.gift[i].chance);
                            this.gift[i].chanceEnd = sum;
                        }
                        console.log(this.gift);
                    }
                })

            },
            async play() {
                // 验证手机号码格式是否正确
                if (!this.validate()) return;
                // 验证该号码是否抽过奖
                const res = await this.checkBeenLottery();
                const beenLottery = res.data.msg.length != 0;
                if (beenLottery) {
                    // 已经抽过奖了
                    this.dialogShow = true;
                    this.dialogTitle = '此号码已抽过奖';
                    setTimeout(() => {
                        this.dialogShow = false;
                    }, 1000);
                } else {
                    // 开始抽奖
                    this.lottery();
                }

            },
            validate() {
                // 简单验证 判断是否数字 以及 号码长度 不作正则验证

                let phone = +this.phone; //转成纯数字 如果数字中混杂字母会转成NaN
                if (phone.toString().length == 11) {
                    // if (phone.toString().length == 1) {
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
            async lottery() {

                this.randomLottery();
                const res=await this.postLottery();
                this.checkIsSucceed(res.data);


                // 签名数据,BASE64(MD5(utime+密钥))摘要算法

                // const utime = +new Date(); // 时间戳
                // const value = md5(utime + this.key); // md5 加密
                // const sign = Base64.encode(value); // base64 转换

                // $.ajax({
                //     url: 'https://app.hxsapp.com/api/Innovsys/quickLogin',
                //     type: 'post',
                //     dataType: 'json',
                //     data: {
                //         username: '18826139660',
                //         utime,
                //         sign
                //     },
                //     success: (data) => {
                //         if (data.code == 200) {
                //             const res = data.data;
                //             const user_id = res.user_id;
                //             $.ajax({
                //                 url: 'https://act.hxsapp.com/base/UserAward/log',
                //                 type: 'post',
                //                 dataType: 'json',
                //                 data: {
                //                     user_id,
                //                     award: '测试',
                //                     descr: '测试',
                //                     image: '测试',
                //                     link: '测试',
                //                     utime,
                //                     sign
                //                 },
                //                 success:(data)=>{
                //                     console.log(data)
                //                 }
                //             })
                //         }
                //     }
                // })

            },
            async checkBeenLottery() { // 验证用户之前是否已经抽过奖
                return this.axios({
                    method: 'get',
                    url: 'http://api.24haowan.com/user/' + this.phone + '/gift'
                })
            },
            randomLottery() { // 随机奖品
                const ran = Math.random() * 100;
                let gift_id = '';
                // 根据抽奖区间 发起抽奖请求
                for (let i = 0, len = this.gift.length; i < len; i++) {
                    if (ran >= this.gift[i].chanceStart && ran < this.gift[i].chanceEnd) {
                        console.log(ran, this.gift[i].name);
                        this.gift_id = this.gift[i]._id;
                        this.giftName = this.gift[i].name;
                        this.giftUrl = this.gift[i].url;
                        break;
                    }
                }
            },
            postLottery() {
                return this.axios({
                    url:'http://api.24haowan.com/user/' + this.phone + '/gift',
                    method:'post',
                    data:{
                        gift_id:this.gift_id
                    }
                })
            },
            // 判断用户是否中奖
            checkIsSucceed(data) {
                if (data.code == 0) {
                    // 说明中奖
                    this.$router.push({
                        path: '/LotterySucceed',
                        query: {
                            name: this.giftName,
                            url: this.giftUrl
                        }
                    });
                } else if (data.code == 1) {
                    // 说明奖品数量为0 即没有中奖
                    this.$router.push('/LotteryFail');
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
