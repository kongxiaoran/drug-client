export default {
    // 基础url前缀
    baseURL:'http://127.0.0.1:80',
    // 配置请求头信息
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'token':sessionStorage.getItem("token"),
    },
    // 设置超时S时间
    timeout: 5000,
}
