import axios from './commonApi' // 倒入 api


/**
 * 获取首页推荐
 *
 */
export const getReommentShow = params =>{
    return axios.post('/shop/api/recommend', params)
}

/**
 * 获取系统名称
 *
 */
export const getSysName = params =>{
    return axios.post('/shop/api/paramInfo', params)
}

/**
 * 获取类目信息
 *
 */
export const getType = params =>{
    return axios.post('/shop/api/typeInfo', params)
}

/**
 * 获取通知信息
 *
 */
export const getNotice = params =>{
    return axios.post('/system/notice/list', params)
}
/**
 * 根据类目获取商品信息
 *
 */
export const getGoodListByType = params =>{
    return axios.post('/shop/api/goods', params)
}

/**
 * 根据id获取商品信息
 *
 */
export const getGoodsDetail = params =>{
    return axios.post('/shop/api/goodsInfo', params)
}
/**
 * 根据id获取商品-详情信息
 *
 */
export const getGoodsDetailPic = params =>{
    return axios.post('/shop/api/attachment', params)
}


/**
 * 根据id获取商品-评价信息
 *
 */
export const getGoodsAppraise = params =>{
    return axios.post('/shop/api/apprise', params)
}

/**
 * 登录
 *
 */
export const vueLogin = params =>{
        return axios.post('/vue-login', params)
    }

/**
 * 注册
 *
 */
export const vueregister = params =>{
    return axios.post('/register', params)
}

/**
 * 获取登录信息
 *
 */
export const getLoginInfo = params =>{
    return axios.post('/shop/api/my', params)
}

/**
 * 获取订单，收藏，购物车信息
 *
 */
export const getcartList = params =>{
    return axios.post('/shop/api/cartList', params)
}
/**
 * 创建订单，收藏，购物车信息
 *
 */
export const addCartList = params =>{
    return axios.post('/shop/api/addOrder', params)
}
/**
 * 支付
 *
 */
export const addpay = params =>{
    return axios.post('/shop/api/pay', params)
}

/**
 * 删除收藏，购物车
 *
 */
export const deleteOrder = params =>{
    return axios.post('/shop/api/deleteOrder', params)
}

/**
 * 发布评论
 *
 */
export const addappraise = params =>{
    return axios.post('/shop/api/addappraise', params)
}

/**
 * 确认收货
 *
 */
export const updateorder = params =>{
    return axios.post('/shop/api/updateorder', params)
}

/**
 * x修改密码
 *
 */
export const updatepass = params =>{
    return axios.post('/shop/api/updatepass', params)
}

/**
 * 搜索
 *
 */
export const search = params =>{
    return axios.post('/shop/api/searchGoods', params)
}







