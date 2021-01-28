<template>
  <div ref="box" class="word-cloud">
    <canvas
      class="word-cloud__box"
      :style="`cursor: ${cursor};`"
      ref="wordcloud"
    ></canvas>
    <div
      v-show="showTooltip"
      class="word-cloud__tooltip"
      :style="`left: ${left}; top: ${top};`"
      v-html="tooltipHtml"
    ></div>
    <div v-if="loadingBox" v-show="loading">
      <slot name="loading">
        <WordCloudLoading></WordCloudLoading>
      </slot>
    </div>
  </div>
</template>

<script>
// import npm package
import WordCloud from 'wordcloud'
import DomResizeListener from 'dom-resize-listener'

// import utils
import { parseFormatter, parseShape } from '@/utils/tool.js'

// import components
import WordCloudLoading from './WordCloudLoading'

export default {
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
    loadingBox: {
      type: Boolean,
      default: true
    },
    resize: {
      type: Boolean,
      default: false
    }
  },
  components: {
    WordCloudLoading
  },
  data() {
    return {
      loading: true,
      wordCloudOpt: {},
      initStatus: false,
      wordCloudEl: '',
      left: 0,
      top: 0,
      cursor: 'default',
      tooltipHtml: '',
      showTooltip: false,
      box: null,
      resizeObserver: null,
      wordMark: 0
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler(val) {
        this.wordCloudOpt = this.lodash.cloneDeep(val)
      },
    },
    wordCloudOpt: {
      immediate: true,
      async handler() {
        this.initData()
        this.initFont()
        this.initColor()
        this.initTooltip()
        await this.initShape()
        // '$nextTick' can be guaranteed to get dom instance
        this.$nextTick(() => {
          const status = this.initStatus
          if (!this.initStatus) {
            this.wordCloudEl = this.$refs['wordcloud']
            this.initStatus = true
            this.initResize()
          }
          this.renderWordCloud()
          this.wordCloudEl.addEventListener('wordcloudstop', () => {
            if (status) {
              this.loading = false
            }
          })
        })
      },
    },
  },
  mounted() {
    this.box = this.$refs['box']
    this.box.addEventListener('mouseout', this.mouseoutHandler)
  },
  // tip: we should remove all event listener when being destroyed
  beforeDestroy() {
    this.box.removeEventListener('mouseout', this.mouseoutHandler)
  },
  methods: {
    // resize word cloud
    initResize() {
      if (this.resize) {
        this.resizeObserver = new DomResizeListener()
        this.resizeObserver.addListener(this.wordCloudEl, () => {
          this.renderWordCloud()
        })
      }
    },
    // loading data
    loadingData() {
      this.loading = true
    },
    // render word cloud
    renderWordCloud() {
      const { clientWidth, clientHeight } = this.$refs['box']
      this.wordCloudEl.setAttribute('width', clientWidth)
      this.wordCloudEl.setAttribute('height', clientHeight)
      WordCloud(this.wordCloudEl, this.wordCloudOpt)
    },
    // mouseout handler for close tooltip box
    mouseoutHandler() {
      this.showTooltip = false
    },
    // tooltip hanlder for wordcloud's hover hook
    tooltipHandler(item, dimension, event) {
      // eslint-disable-line
      if (item) {
        this.left = `${event.offsetX + 15}px`
        this.top = `${event.offsetY + 10}px`
        this.showTooltip = true
        this.cursor = 'pointer'
        if (this.wordCloudOpt.tooltip && !this.wordCloudOpt.tooltip.show) {
          this.showTooltip = false
          this.cursor = 'default'
        } else {
          this.tooltipHtml =
            this.wordCloudOpt.tooltip &&
            this.wordCloudOpt.tooltip.formatter &&
            typeof this.wordCloudOpt.tooltip.formatter === 'function'
              ? this.wordCloudOpt.tooltip.formatter(item, dimension, event)
              : this.wordCloudOpt.tooltip && this.wordCloudOpt.tooltip.formatter
              ? parseFormatter(this.wordCloudOpt.tooltip.formatter, item)
              : `${item.name}: ${item.value}`
        }
      } else {
        this.showTooltip = false
        this.cursor = 'default'
      }
    },
    // get font size
    getFontSize(index) {
      if (this.wordCloudOpt.fonts && !Array.isArray(this.wordCloudOpt.fonts)) {
        throw new Error(`type error: option 'fonts' should be an array`)
      }
      if (
        this.wordCloudOpt.fonts &&
        Array.isArray(this.wordCloudOpt.fonts) &&
        this.wordCloudOpt.fonts.length !== 0
      ) {
        let len = this.wordCloudOpt.fonts.length
        let font = this.wordCloudOpt.fonts[index]
        if (!font) {
          font = this.wordCloudOpt.fonts[len - 1]
        }
        return font
      } else {
        return 12
      }
    },
    // init data and font
    initData() {
      if (this.wordCloudOpt.data) {
        if (Array.isArray(this.wordCloudOpt.data)) {
          if (this.wordCloudOpt.data.length === 0) {
            return
          }
          this.wordCloudOpt.list = []
          const addtionalAttrs = Object.keys(this.wordCloudOpt.data[0]).filter(
            (key) => key !== 'name' && key !== 'value'
          )
          this.wordCloudOpt.data.forEach((item, index) => {
            const listItem = [item.name, this.getFontSize(index), item.value]
            const addtionalObj = {}
            addtionalAttrs.forEach((attr) => {
              addtionalObj[attr] = item[attr]
            })
            listItem.push(addtionalObj)
            this.wordCloudOpt.list.push(listItem)
          })
        } else {
          throw new Error(`type error: option 'data' should be an array`)
        }
      }
    },
    // init tooltip
    initTooltip() {
      // prevent developer overriding hover option
      const hover = this.wordCloudOpt.hover || ''
      const handler = (item, dimension, event) => {
        // eslint-disable-line
        let itemData = {}
        if (!item) {
          itemData = ''
        } else if (
          this.wordCloudOpt.data &&
          Array.isArray(this.wordCloudOpt.data) &&
          this.wordCloudOpt.data.length
        ) {
          itemData = {
            name: item[0],
            fontSize: item[1],
            value: item[2],
            ...item[3],
          }
        } else {
          itemData = {
            name: item[0],
            fontSize: item[1],
            value: item[2],
            additionalAttrs: [],
          }
          for (let i = 0; i < item.length; i++) {
            itemData.additionalAttrs.push(item[i])
          }
        }
        if (hover) {
          hover(itemData, dimension, event)
        }
        this.tooltipHandler(itemData, dimension, event)
      }
      this.wordCloudOpt.hover = handler
    },
    // init fonts
    initFont() {
      if (this.wordCloudOpt.fonts) {
        if (!Array.isArray(this.wordCloudOpt.colors)) {
          throw new Error(`type error: option 'colors' should be an array`)
        }

        if (this.wordCloudOpt.fonts.length === 0 
          || !this.wordCloudOpt.list 
          || !Array.isArray(this.wordCloudOpt.list) 
          || this.wordCloudOpt.list.length === 0) {
          return
        }

        const len = this.wordCloudOpt.fonts.length
        this.wordCloudOpt.list.forEach((item, index) => {
          item[1] =
            index < len
              ? this.wordCloudOpt.fonts[index]
              : this.wordCloudOpt.fonts[len - 1]
        })
      }
    },
    // init colors
    initColor() {
      if (this.wordCloudOpt.colors) {
        if (!Array.isArray(this.wordCloudOpt.colors)) {
          throw new Error(`type error: option 'colors' should be an array`)
        }

        if (this.wordCloudOpt.colors.length === 0 
          || !this.wordCloudOpt.list 
          || !Array.isArray(this.wordCloudOpt.list) 
          || this.wordCloudOpt.list.length === 0) {
          return
        }

        const len = this.wordCloudOpt.colors.length
        this.wordCloudOpt.color = () => {
          const index = this.wordMark
          this.wordMark++
          return (
            this.wordCloudOpt.colors[index] ||
            this.wordCloudOpt.colors[len - 1]
          )
        }
      }
    },
    // init shape polar equation
    initShape() {
      if (this.wordCloudOpt.imageShape) {
        const img = new Image()
        img.src = this.wordCloudOpt.imageShape

        return new Promise((resolve) => {
          img.onload = () => {
            this.wordCloudOpt.shape = new Function('theta', parseShape(img))
            resolve()
          }
        })
      }
    }
  },
}
</script>

<style lang="scss">
.word-cloud {
  width: 100%;
  height: 100%;
  position: relative;
}

.word-cloud__box {
  width: 100%;
  height: 100%;
}

.word-cloud__tooltip {
  font-size: 16px;
  color: #ffffff;
  text-align: left;
  min-width: 100px;
  line-height: 30px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 4px;
  position: absolute;
}
</style>
