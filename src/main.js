// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import sdk from './config/sdk'

Vue.prototype.axios=axios
Vue.config.productionTip = false

// sdk.getWxSignPackage(sdk.configWx.bind(sdk));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
