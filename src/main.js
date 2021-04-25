import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*引入element-ui*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


//import axios from './http/api';

// 引入mockjs
//require('./mock/mock.js')
import apis from './api/commonApi'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$api1=apis;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
