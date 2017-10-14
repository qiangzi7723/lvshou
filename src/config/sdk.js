export default {

    wxSignPackage:null,
    getWxSignPackage: function (callback) {
        
        var self = this
        $.ajax({
            url: 'http://api.24haowan.com/get_jssdk_config',
            dataType: 'json',
            type: 'get',
            async: false,
            data: {
                url: location.href.split('#')[0]
            },
            success: function (result) {
                var msg = result.data || result.msg;
                self.wxSignPackage = msg;
                self.wxSignPackage.appId='wxef721b05e2002815';
                if (callback) callback(msg);
            },
            error: function (xhr, errorType, error) {
                // self.error("返回结果: ", xhr, errorType);
            }
        });
    },

    configWx: function () {
        console.log(this.wxSignPackage);
        // 这里有个坑。用//api.24haowan.com时，nonceStr是大写。用平台时是：noncestr。切换时记得切换
        if (!this.wxSignPackage.appId || !this.wxSignPackage.timestamp || !this.wxSignPackage.noncestr || !this.wxSignPackage.signature) {
            // if(false) {
            return false;
        } else {
            /* 微信接口 */
            wx.config({
                debug: true,
                appId: this.wxSignPackage.appId,
                // appId: config.appId(),
                timestamp: this.wxSignPackage.timestamp,
                nonceStr: this.wxSignPackage.noncestr,
                signature: this.wxSignPackage.signature,
                jsApiList: [
                    // 所有要调用的 API 都要加到这个列表中
                    'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems',
                    // 录音相关
                    'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice'
                ]
            });
        }
        return this;
    },
    setWxShare: function (callback, type, name, style) {
        var share={
            title:1,
            link:1,
            imgUrl:1,
            desc:1
        }

        // 配置分享信息
        wx.ready(function () {
            // 在这里调用 API
            //分享朋友圈
            wx.onMenuShareTimeline({
                title: share.title, // 分享标题
                link: share.link, // 分享链接
                imgUrl: share.imgUrl, // 分享图标
                success: function () {
                    if (callback) callback()
                    // sdk.commitShare()
                },
                cancel: function () {
                    // masks.share.show = false;
                    // alert('fenxiangshibai ')
                }
            });

            //分享朋友
            wx.onMenuShareAppMessage({
                title: share.title, // 分享标题
                desc: share.desc, // 分享描述
                link: share.link, // 分享链接
                imgUrl: share.imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    console.log(1)
                    if (callback) callback()
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    // masks.share.show = false;
                    // alert('fenxiangshibai ')
                }
            });
        })
    },
}
