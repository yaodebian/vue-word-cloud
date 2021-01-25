import Vue from 'vue'
import App from './App.vue'

import lodash from 'lodash'

Vue.config.productionTip = false
Vue.prototype.lodash = lodash

new Vue({
  render: h => h(App),
}).$mount('#app')
