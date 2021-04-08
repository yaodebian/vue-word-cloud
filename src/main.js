import Vue from 'vue'
import App from './App.vue'

import lodash from 'lodash'

Vue.config.productionTip = false
Vue.prototype.lodash = lodash

// develop
import WordCloud from './components/WordCloud'
Vue.component('WordCloud', WordCloud)

// bundle
// import '../dist/vue-word-cloud.css'
// import VueWordCloud from '../dist/vue-word-cloud.umd.js'
// Vue.use(VueWordCloud)

new Vue({
  render: h => h(App),
}).$mount('#app')
