<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Vue Word Cloud</h1>
    <LoadingDemo ref="wordCloud" class="word-cloud__demo"></LoadingDemo>
    <LoadingCustomDemo ref="wordCloud" class="word-cloud__demo"></LoadingCustomDemo>
    <LoadingNoneDemo ref="wordCloud" class="word-cloud__demo"></LoadingNoneDemo>
    <ResizeDemo ref="wordCloud" class="word-cloud__demo"></ResizeDemo>
    <ShapeDemo ref="wordCloud" class="word-cloud__demo"></ShapeDemo>
    <SameTextDemo ref="wordCloud" class="word-cloud__demo"></SameTextDemo>
  </div>
</template>

<script>
// import components
import LoadingDemo from '@/demos/LoadingDemo.vue'
import LoadingCustomDemo from '@/demos/LoadingCustomDemo.vue'
import LoadingNoneDemo from '@/demos/LoadingNoneDemo.vue'
import ResizeDemo from '@/demos/ResizeDemo.vue'
import ShapeDemo from '@/demos/ShapeDemo.vue'
import SameTextDemo from '@/demos/SameTextDemo.vue'

export default {
  name: 'App',
  components: {
    LoadingDemo,
    LoadingCustomDemo,
    LoadingNoneDemo,
    ResizeDemo,
    ShapeDemo,
    SameTextDemo
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.word-cloud__demo {
  margin-bottom: 20px;
}

.word-cloud-example {
  height: 600px !important;
  background: rgba(0, 0, 0, 0.8);
  margin: 0 auto;
}
</style>
