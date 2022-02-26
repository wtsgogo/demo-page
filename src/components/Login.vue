<template>
    <div class="login">
        <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import utils from "../utils"

export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        onSubmit(val) {
            this.$axios.get(`/login/${val.password}`).then(res => {
                if (res.code === 0) {
                    utils.setToken(res.data)
                    if (this.$route.query.redirect) {
                        this.$router.replace({
                            path: this.$route.query.redirect
                        })
                    }
                }
            })
        },
        onClickLeft() {
            this.$router.back()
        }
    }
}
</script>
