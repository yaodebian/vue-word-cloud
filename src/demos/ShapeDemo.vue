<template>
  <div>
    <h2>Demo6: Shape</h2>
    <WordCloud ref="wordCloud" class="word-cloud-example" :option="wordCloudOpt"></WordCloud>
  </div>
</template>

<script>
export default {
  name: 'ShapeDemo',
  data() {
    return {
      wordCloudOpt: {
        vImageShape: require('@/assets/logo.png'),
        tooltip: {
          show: true,
          formatter: '标签名：{{name}}<br>数值：{{value}}',
          // formatter: (item, dimension, event) => { // eslint-disable-line
          //   return `${item.name}<br>${item.value}`
          // },
        },
        vFonts: [10],
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
      const list = []
      for (let i = 0; i < 200; i++) {
        list.push({
          name: i,
          value: 24
        })
      }
      this.wordCloudOpt.vData = list
    }, 6000)
  }
}
</script>

<style lang="scss">
</style>