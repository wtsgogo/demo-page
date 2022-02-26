function getToken() {
    const s = sessionStorage.getItem('demo-token')
    if (s) {
        const [timestamp, token] = s.split(' ')
        const now = Date.now()
        // 两小时提前10分钟过期
        if ((now - parseInt(timestamp)) > (2 * 60 - 10) * 60 * 1000) {
            sessionStorage.setItem('demo-token', '')
            return ''
        }
        return token
    }
    return ''
}

function setToken(token) {
    sessionStorage.setItem('demo-token', `${Date.now()} ${token}`)
}

export default {
    getToken,
    setToken
}
