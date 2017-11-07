import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import store from './store'
import fastclick from 'fastclick'
import VueLazylod from 'vue-lazyload'

fastclick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueLazylod, {
  loading: require('common/image/default.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
