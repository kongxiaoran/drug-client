import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    token:"",
    islogin:false,
    goodsid:''
  },
  mutations: {
    // 保存当前登录token
    saveToken(state,token){
      state.token = token;
      sessionStorage.setItem("token", token)
    },
    // 保存当前页的信goodsid
    saveCurrentPageInfos(state,goodsid){
      state.goodsid = goodsid;
      sessionStorage.setItem("goodsid", goodsid)
    },
    saveIsLogin(state,islogin){
      state.islogin = islogin;
      sessionStorage.setItem("islogin", islogin)
    },

  },
  actions: {
  },
  modules: {
  },
  getters:{
    getToken(state){
      if(state.token === null){
        state.token = sessionStorage.getItem('token')
      }
      return state.token;
    },
    getGoodsId(state){
      if(state.goodsid === null){
        state.goodsid = sessionStorage.getItem('goodsid')
      }
      return state.goodsid;
    },
  },
  // 会自动保存创建的状态
//默认存储到localStorage

})

