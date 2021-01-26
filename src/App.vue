<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Vue Word Cloud</h1>
    <LoadingDemo ref="wordCloud" class="word-cloud__demo"></LoadingDemo>
    <LoadingCustomDemo ref="wordCloud" class="word-cloud__demo"></LoadingCustomDemo>
    <LoadingNoneDemo ref="wordCloud" class="word-cloud__demo"></LoadingNoneDemo>
  </div>
</template>

<script>
// import components
import LoadingDemo from '@/demos/LoadingDemo.vue'
import LoadingCustomDemo from '@/demos/LoadingCustomDemo.vue'
import LoadingNoneDemo from '@/demos/LoadingNoneDemo.vue'

export default {
  name: 'App',
  components: {
    LoadingDemo,
    LoadingCustomDemo,
    LoadingNoneDemo
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
</style>
