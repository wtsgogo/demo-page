<template>
    <div class="home">
        <van-notice-bar left-icon="volume-o" text="注意:该应用只是一个测试版本,请勿将它用于任何生产环境!" mode="closeable" />
        <van-swipe style="height: 200px;" :autoplay="3000" indicator-color="white" vertical>
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
        <van-grid :column-num="3" square>
            <van-grid-item icon="user-circle-o" text="用户登录" to="/login" />
            <van-grid-item icon="comment-o" text="消息管理" to="/msg" />
            <van-grid-item icon="service-o" text="联系客服" @click="noFunction" />
            <van-grid-item icon="cluster-o" text="菜单管理" @click="noFunction" />
            <van-grid-item icon="star-o" text="源码" url="https://github.com/wtsgogo/" />
            <van-grid-item icon="bar-chart-o" text="数据" @click="noFunction" />
            <van-grid-item icon="setting-o" text="设置" @click="noFunction" />
            <van-grid-item icon="share-o" text="分享" @click="showShare = true" />
            <van-grid-item icon="search" text="百度一下" url="https://www.baidu.com/" />
        </van-grid>
        <van-divider>Copyright &copy; 版权所有</van-divider>
        <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="shareOptions" @select="onShareSelect" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            showShare: false,
            shareOptions: [
                { name: '微信', icon: 'wechat' },
                { name: '朋友圈', icon: 'wechat-moments' },
                { name: '微博', icon: 'weibo' },
                { name: 'QQ', icon: 'qq' },
                { name: '复制链接', icon: 'link' },
                { name: '小程序码', icon: 'weapp-qrcode' },
                { name: '二维码', icon: 'qrcode' },
                { name: '分享海报', icon: 'poster' }
            ]
        }
    },
    methods: {
        noFunction() {
            this.$toast.fail('无权访问')
        },
        onShareSelect(option) {
            this.$toast(`请先打开${option.name}`)
        }
    }
}
</script>

<style scoped>
.van-swipe-item {
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 200px;
    background-color: dodgerblue;
}
</style>
