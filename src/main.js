import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font_3610830_lt2my0wa5ks/iconfont.css'

import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
