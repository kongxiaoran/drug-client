import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index.vue'),
    redirect: 'Home',
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          name: '首页'
        }
      },
      {
        path: 'GoodDetailMain',
        name: 'GoodDetailMain',
        component: () => import('../components/Goods/GoodDetailMain.vue'),
        meta: {
          name: '商品详情'
        }
      },
      {
        path: 'myshop',
        name: 'myshop',
        component: () => import('../components/my/myshop.vue'),
        meta: {
          name: '商品详情'
        }
      },
      {
        path: 'pay',
        name: 'pay',
        component: () => import('../components/Goods/pay.vue'),
        meta: {
          name: '支付页面'
        }
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('../components/Goods/search.vue'),
        meta: {
          name: '支付页面'
        }
      },
      ]

  },

]

const router = new VueRouter({
  routes
})



export default router
