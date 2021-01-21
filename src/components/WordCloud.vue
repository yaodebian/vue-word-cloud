<template>
  <div ref="box" class="word-cloud">
    <canvas class="word-cloud__box" :style="`cursor: ${cursor};`" ref="wordcloud"></canvas>
    <div
      v-show="showTooltip"
      class="word-cloud__tooltip"
      :style="`left: ${left}; top: ${top};`"
      v-html="tooltipHtml"></div>
  </div>
</template>

<script>
import WordCloud from 'wordcloud'
export default {
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      initStatus: false,
      wordcloudEl: '',
      left: 0,
      top: 0,
      cursor: 'default',
      tooltipHtml: '',
      showTooltip: false,
      box: null,
      mouseoutListener: null,
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        val.hover = this.tooltipHandler.bind(this)
        this.$nextTick(() => {
          if (!this.initStatus) {
            this.wordcloudEl = this.$refs['wordcloud']
          }
          const { clientWidth, clientHeight } = this.$refs['box']
          this.wordcloudEl.setAttribute('width', clientWidth)
          this.wordcloudEl.setAttribute('height', clientHeight)
          WordCloud(this.wordcloudEl, val)
        })
      },
    },
  },
  mounted() {
    this.box = this.$refs['box']
    this.mouseoutListener = this.box.addEventListener('mouseout', () => {
      this.showTooltip = false
    })
  },
  beforeDestroy() {
    this.box.clearEventListener('mouseout')
  },
  methods: {
    tooltipHandler(item, dimension, event) { // eslint-disable-line
      if (item) {
        this.left = `${event.offsetX + 15}px`
        this.top = `${event.offsetY + 10}px`
        this.showTooltip = true
        this.cursor = 'pointer'
        if (this.option.formatter && typeof this.option.formatter === 'function') {
          this.tooltipHtml = this.option.formatter(item, dimension, event)
        } else {
          this.tooltipHtml = `${item[0]}<br>${item[1]}`
          if (typeof this.option.formatter !== 'function') {
            console.warn('option "formatter" should be a function')
          }
        }
      } else {
        this.showTooltip = false
        this.cursor = 'default'
      }
    },
  },
}
</script>

<style lang="scss">
.word-cloud {
  width: 100%;
  height: 100%;
  position: relative;

  .word-cloud__box {
    width: 100%;
    height: 100%;
  }

  .word-cloud__tooltip {
    font-size: 16px;
    color: #ffffff;
    min-width: 100px;
    line-height: 30px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 4px;
    position: absolute;
  }
}
</style>