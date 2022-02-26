<template>
    <div class="edit">
        <van-popup v-model:show="pickerShow" round position="bottom">
            <van-picker title="消息类型" :columns="msgTypeOptions" @confirm="onConfirm" @cancel="pickerShow = false" />
        </van-popup>
        <van-nav-bar title="编辑" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="msgName" name="msgName" label="规则名称" placeholder="规则名称" :rules="[{ required: true, message: '请填写规则名称' }]" maxlength="15" />
                <van-field label="消息类型" name="msgType" :model-value="filtedMsgText" readonly is-link @click="pickerShow = true" />
                <van-field v-show="msgType === 'text'" v-model="content" name="content" label="回复内容" type="textarea" rows="2" autosize maxlength="200" show-word-limit placeholder="请输入文本" />
                <van-cell title="关键词" center>
                    <van-tag type="primary" size="large" closeable v-for="keyword in keywords" :plain="keyword.MatchType === 'half'" @close="onKeyDelete(keyword.ID)">{{ keyword.Value }}</van-tag>
                    <van-tag type="primary" size="large" @click="overlayShow = true">+</van-tag>
                </van-cell>
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <van-overlay :show="overlayShow" @click="overlayShow = false">
            <div class="wrapper">
                <div class="block" @click.stop>
                    <van-form @submit="onKeySubmit">
                        <van-cell-group inset>
                            <van-field v-model="keyValue" name="keyValue" label="关键词" placeholder="关键词" :rules="[{ required: true, message: '请填写关键词' }]" maxlength="10" />
                            <van-field name="keyMatchType" label="匹配规则">
                                <template #input>
                                    <van-radio-group v-model="keyMatchType" direction="horizontal">
                                        <van-radio name="all">全匹配</van-radio>
                                        <van-radio name="half">半匹配</van-radio>
                                    </van-radio-group>
                                </template>
                            </van-field>
                        </van-cell-group>
                        <van-button block type="primary" native-type="submit">提交</van-button>
                    </van-form>
                </div>
            </div>
        </van-overlay>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msgName: '',
            msgType: 'text',
            pickerShow: false,
            msgTypeOptions: [
                {
                    text: '文本',
                    value: 'text'
                },
                {
                    text: '图片',
                    value: 'image'
                },
                {
                    text: '语音',
                    value: 'voice'
                },
                {
                    text: '视频',
                    value: 'video'
                },
                {
                    text: '音乐',
                    value: 'music'
                },
                {
                    text: '图文',
                    value: 'news'
                }
            ],
            content: '',
            overlayShow: false,
            keyValue: '',
            keyMatchType: 'all',
            keywords: []
        }
    },
    computed: {
        filtedMsgText() {
            for (const item of this.msgTypeOptions) {
                if (item.value === this.msgType) {
                    return item.text
                }
            }
            return ''
        }
    },
    methods: {
        onClickLeft() {
            this.$router.back()
        },
        onConfirm(val) {
            this.msgType = val.value
            this.pickerShow = false
        },
        onSubmit(val) {
            if (this.keywords.length === 0) {
                this.$dialog.alert({
                    message: '关键词不能为空',
                })
                return
            }
            let data = {
                name: val.msgName,
                keywords: JSON.parse(JSON.stringify(this.keywords)),
                ...val,
            }
            data.msgType = this.msgType // 修正参数
            if (this.$route.query.id) {
                data.id = parseInt(this.$route.query.id)
                this.$axios.put('/msg', data).then(res => {
                    if (res.code === 0) {
                        this.$dialog.alert({
                            message: '数据更新成功'
                        })
                    }
                })
                return
            }
            this.$axios.post('/msg', data).then(res => {
                if (res.code === 0) {
                    this.$dialog.alert({
                        message: '数据提交成功'
                    }).then(() => {
                        this.keywords = []
                    })
                }
            })
        },
        onKeySubmit(val) {
            const data = {
                value: val.keyValue,
                matchType: val.keyMatchType
            }
            this.$axios.post('/key', data).then(res => {
                if (res.code === 0) {
                    this.keywords.push(res.data)
                    this.overlayShow = false
                    this.keyValue = ''
                }
            })
        },
        onKeyDelete(id) {
            this.$axios.delete(`/key/${id}`).then(res => {
                if (res.code === 0) {
                    const i = this.keywords.findIndex(obj => obj.ID === id)
                    this.keywords.splice(i, 1)
                }
            })
        }
    },
    created() {
        if (this.$route.query.id) {
            this.$axios.get(`/msg/${this.$route.query.id}`).then(res => {
                if (res.code === 0) {
                    this.msgName = res.data.Name
                    this.msgType = res.data.MsgType
                    this.content = res.data.Content
                    this.keywords = res.data.Keywords
                }
            })
        }
    }
}
</script>

<style scoped>
.van-tag {
    margin-left: 2px;
    margin-bottom: 1px;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    background-color: white;
    border-radius: 2px;
}
</style>
