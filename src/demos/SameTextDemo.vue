<template>
  <div>
    <h2>Demo7: SameText</h2>
    <WordCloud ref="wordCloud" class="word-cloud" :option="wordCloudOpt"></WordCloud>
  </div>
</template>

<script>
// import components
import WordCloud from '@/components/WordCloud.vue'

export default {
  name: 'SameTextDemo',
  components: {
    WordCloud
  },
  data() {
    return {
      wordCloudOpt: {
        imageShape: require('@/assets/star.png'),
        tooltip: {
          show: true,
          formatter: '标签名：{{name}}<br>数值：{{value}}',
          // formatter: (item, dimension, event) => { // eslint-disable-line
          //   return `${item.name}<br>${item.value}`
          // },
        },
        fonts: [10],
        colors: [
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
        data: [],
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
      const list = []
      for (let i = 0; i < 100; i++) {
        list.push({
          name: '冬沐',
          value: 24
        })
      }
      this.wordCloudOpt.data = list
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