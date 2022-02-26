import axios from 'axios'
import router from './router'
import utils from './utils'
import { Toast, Dialog } from 'vant'

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/api',
    headers: {
        authorization: utils.getToken()
    },
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
        Toast.loading({
            duration: 0,
            forbidClick: true,
            message: '加载中...',
        })
        return config
    }
)

instance.interceptors.response.use(
    res => {
        Toast.clear()
        const data = res.data
        if (data.code === 1) {
            Dialog.alert({
                message: data.msg
            })
        }
        if (data.code === 2) {
            Dialog.confirm({
                title: '身份过期',
                message: '是否跳转到登录界面?'
            }).then(() => {
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
            })
        }
        // 只需要处理 data.code === 0 的情况
        return data
    },
    err => {
        Toast.clear()
        return Promise.reject(err)
    }
)

export default {
    install(app, options) {
        app.config.globalProperties.$axios = instance
    }
}
