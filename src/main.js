import Vue from 'vue'
import App from './App.vue'

import lodash from 'lodash'

Vue.config.productionTip = false
Vue.prototype.lodash = lodash

// import VueWordCloud from '../dist/vue-word-cloud.umd.js'
// Vue.use(VueWordCloud)

new Vue({
  render: h => h(App),
}).$mount('#app')
