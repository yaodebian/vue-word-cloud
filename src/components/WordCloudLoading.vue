<template>
  <div class="word-cloud-loading">
    <div class="word-cloud-loading__loader">
      <div class="word-cloud-loading__loader-dot"></div>
      <div class="word-cloud-loading__loader-dot"></div>
      <div class="word-cloud-loading__loader-dot"></div>
      <div class="word-cloud-loading__loader-dot"></div>
      <div class="word-cloud-loading__loader-dot"></div>
      <div class="word-cloud-loading__loader-dot"></div>
      <div class="word-cloud-loading__loader-text"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WordCloudLoading'
}
</script>

<style lang="scss">
$loader--width: 250px;
$loader-dot--size: 20px;

.word-cloud-loading {
  width: 100%;
  height: 100%;
  background: #000000;
  position: absolute;
  left: 0;
  top: 0;
}

.word-cloud-loading__loader {
  width: $loader--width;
  height: $loader-dot--size;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.word-cloud-loading__loader-dot {
  width: $loader-dot--size;
  height: $loader-dot--size; 
  border-radius: 100%;
  position: absolute;
  animation: loader 3s ease-in-out infinite;

  &:nth-child(1) {
    background-color: #8cc759;
    animation-delay: 0.6s;
  }
  &:nth-child(2) {
    background-color: #8c6daf;
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    background-color: #ef5d74;
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    background-color: #f9a74b;
    animation-delay: 0.2s;
  }
  &:nth-child(5) {
    background-color: #60beeb;
    animation-delay: 0.1s;
  }
  &:nth-child(6) {
    background-color: #fbef5a;
    animation-delay: 0s;
  }
}

.word-cloud-loading__loader-text {
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  width: 100%;
  position: absolute;
  left: 0;
  top: 200%;

  &:after {
    content: "loading";
    font-weight: bold;
    animation: loading-text 3s infinite;
  }
}

@keyframes loader {
  10% {
    transform: translateX(0)
  }
  41% {
    transform: translateX($loader--width)
  }
  59% {
    transform: translateX($loader--width)
  }
  90% {
    transform: translateX(0)
  }
}

@keyframes loading-text {
  0% {
    content: "loading";
  }
  25% {
    content: "loading.";
  }
  50% {
    content: "loading..";
  }
  75% {
    content: "loading...";
  }
}
</style>