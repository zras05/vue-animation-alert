<template>
  <div id="app">
    <div style="padding-top: 80px">
      <img src="/static/imgs/base.png" style="width: 100%" />
    </div>
    <!-- 图标基于左上角的屏幕坐标: [left, top] -->
    <VueAnimationAlert
      ref="taskAlert"
      :coinPosition="coinPosition"
      :goldStarPosition="goldStarPosition"
      :purpleStarPosition="purpleStarPosition"
    />
  </div>
</template>

<script>
import VueAnimationAlert from './components/VueAnimationAlert'
export default {
  name: 'App',
  components: {
    VueAnimationAlert
  },
  data () {
    return {
      coinPosition: [],
      goldStarPosition: [],
      purpleStarPosition: []
    }
  },
  mounted () {
    // 模拟数据
    const vw = document.body.clientWidth
    this.coinPosition = [31, 86]
    this.goldStarPosition = [vw - 87, 79]
    this.purpleStarPosition = [vw - 87, 116]
    // 主任务
    setTimeout(() => {
      this.$refs.taskAlert.showAnimate('mainTask')
    }, 3000)
    // 隐藏任务
    setTimeout(() => {
      this.$refs.taskAlert.showAnimate('hideTask')
    }, 10000)
    // 多样表达
    setTimeout(() => {
      this.$refs.taskAlert.showAnimate('variousExpress')
    }, 20000)
    // 完美发音
    setTimeout(() => {
      this.$refs.taskAlert.showAnimate('perfectPronunciation')
    }, 25000)
    // 完美发音气泡
    setTimeout(() => {
      this.$refs.taskAlert.showBubble('perfectPronunciation')
    }, 30000)
    // 近似发音气泡
    setTimeout(() => {
      this.$refs.taskAlert.showBubble('approximatePronunciation')
    }, 33000)
    // perfect 发音
    setTimeout(() => {
      this.$refs.taskAlert.showVoice('perfect')
    }, 36000)
    // awsome 发音
    setTimeout(() => {
      this.$refs.taskAlert.showVoice('awsome')
    }, 38000)
    // excellent 发音
    setTimeout(() => {
      this.$refs.taskAlert.showVoice('excellent')
    }, 40000)
    // 过大关 发音
    setTimeout(() => {
      this.$refs.taskAlert.showVoice('passAll')
    }, 42000)
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
</style>
