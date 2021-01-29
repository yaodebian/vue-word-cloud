<template>
  <div>
     <h2>Demo3: No Loading</h2>
    <WordCloud ref="wordCloud" class="word-cloud" :option="wordCloudOpt" :loading-box="false"></WordCloud>
  </div>
</template>

<script>
// import components
import WordCloud from '@/components/WordCloud.vue'

export default {
  name: 'LoadingNoneDemo',
  components: {
    WordCloud
  },
  data() {
    return {
      wordCloudOpt: {
        tooltip: {
          show: true,
          formatter: '标签名：{{name}}<br>数值：{{value}}',
          // formatter: (item, dimension, event) => { // eslint-disable-line
          //   return `${item.name}<br>${item.value}`
          // },
        },
        vFonts: [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 13],
        vColors: [
          'red',
          'yellow',
          '#84d9fa',
          '#8497fa',
          '#b084fa',
          '#fa84f6',
          '#ec5c70',
          '#5ceca3',
          '#85b559',
          '#cae765',
          '#cccccc'
        ],
        vData: [],
        weightFactor: 1.8,
        fontWeight: 'normal',
        fontFamily: 'Times, serif',
        rotateRatio: 1,
        shrinkToFit: true,
        backgroundColor: 'transparent'
      }
    }
  },
  mounted() {
    this.$refs['wordCloud'].loadingData()
    setTimeout(() => {
      this.wordCloudOpt.vData = [
          {
            name: '困难救助',
            value: 83
          },
          {
            name: '治安隐患',
            value: 63
          },
          {
            name: '扫黄打非',
            value: 34
          },
          {
            name: '交通安全',
            value: 33
          },
          {
            name: '生态环境',
            value: 31
          },
          {
            name: '老龄殡葬',
            value: 26
          },
          {
            name: '食药安全',
            value: 25
          },
          {
            name: '城市管理',
            value: 23
          },
          {
            name: '卫生健康',
            value: 23
          },
          {
            name: '安全生产',
            value: 20
          },
          {
            name: '工商监管',
            value: 13
          },
          {
            name: '矛盾纠纷',
            value: 13
          },
          {
            name: '文教体育',
            value: 13
          },
          {
            name: '其他',
            value: 11
          },
          {
            name: '自然灾害',
            value: 10
          },
          {
            name: '消防安全',
            value: 8
          },
          {
            name: '治危拆违',
            value: 3
          },
          {
            name: '金融监管',
            value: 3
          },
          {
            name: '质量监管',
            value: 3
          },
          {
            name: '优抚安置',
            value: 2
          },
          {
            name: '信访维稳',
            value: 0
          },
          {
            name: '疫情防控',
            value: 0
          },
          {
            name: '农林水利',
            value: 0
          },
        ]
    }, 6000)
  }
}
</script>

<style lang="scss">
.word-cloud {
  height: 600px;
  background: rgba(0, 0, 0, 0.8);
  margin: 0 auto;
}
</style>