<template>
    <div class="msg">
        <van-nav-bar title="消息列表" left-text="返回" left-arrow @click-left="onClickLeft" />
        <br>
        <van-cell-group inset>
            <van-cell v-for="msg in msgList" :title="msg.Name" is-link @click="gotoEditer(msg.ID)" />
            <br>
            <van-button type="primary" size="large" round icon="plus" @click="createMsg">新增</van-button>
        </van-cell-group>
        <br>
        <van-pagination v-model="pageNum" :page-count="pageCount" mode="simple" @change="pageChange" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            msgList: [],
            msgTotal: 0,
            pageNum: 1,
            pageSize: 20,
        }
    },
    computed: {
        pageCount() {
            return Math.floor(this.msgTotal / this.pageSize) || 1
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        pageChange() {
            this.$axios.get(`/msgs/${this.pageNum}/${this.pageSize}`).then(res => {
                if (res.code === 0) {
                    this.msgList = res.data.list
                    this.msgTotal = res.data.total
                }
            })
        },
        gotoEditer(id) {
            this.$router.push({
                path: '/edit',
                query: { id }
            })
        },
        createMsg() {
            this.$router.push({
                path: '/edit'
            })
        }
    },
    created() {
        // 初始化
        this.pageChange()
    }
}
</script>
