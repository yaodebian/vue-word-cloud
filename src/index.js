import WordCloud from '@/components/WordCloud.vue'

export default {
  install: function (Vue) { // eslint-disable-line
    Vue.component('WordCloud', WordCloud)
  },
}