<template>
  <div>
    <div
      class="taskAlert"
      v-show="
        isMainTaskShow ||
        isHideTaskShow ||
        isVariousExpressShow ||
        isPerfectPronunciationShow ||
        isApproximateRun ||
        isPerfectRun
      "
    >
      <img src="/static/imgs/goldCoin.png" ref="coin1" class="coin1" />
      <img src="/static/imgs/goldCoin.png" ref="coin2" class="coin2" />
      <img src="/static/imgs/goldCoin.png" ref="coin3" class="coin3" />
      <img src="/static/imgs/goldCoin.png" ref="coin4" class="coin4" />
      <img src="/static/imgs/goldCoin.png" ref="coin5" class="coin5" />
      <img src="/static/imgs/goldStar.png" ref="goldStar" class="goldStar" />
      <img
        src="/static/imgs/purpleStar.png"
        ref="purpleStar1"
        class="purpleStar1"
      />
      <img
        src="/static/imgs/purpleStar.png"
        ref="purpleStar2"
        class="purpleStar2"
      />
      <img src="/static/imgs/mainTask.png" ref="mainTask" class="mainTask" />
      <img src="/static/imgs/hideTask.png" ref="hideTask" class="hideTask" />
      <img
        src="/static/imgs/variousExpress.png"
        ref="variousExpress"
        class="variousExpress"
      />
      <img
        src="/static/imgs/perfectPronunciation.png"
        ref="perfectPronunciation"
        class="perfectPronunciation"
      />
      <img
        src="/static/imgs/approximatePronunciation.png"
        :class="['approximatePro', isApproximateRun ? 'proAnimate' : '']"
      />
      <img
        src="/static/imgs/perfectPronunciation.png"
        :class="['perfectPro', isPerfectRun ? 'proAnimate' : '']"
      />
    </div>
    <div class="videoList">
      <video controls muted ref="hideTaskAudio">
        <source src="/static/music/awsome-multy.mp3" type="audio/mpeg" />
      </video>
      <video controls muted ref="variousExpressAudio">
        <source src="/static/music/excellent-man.mp3" type="audio/mpeg" />
      </video>
      <video controls muted ref="passAllAudio">
        <source src="/static/music/pass-the-customs.mp3" type="audio/mpeg" />
      </video>
      <video controls muted ref="mainTaskAudio">
        <source src="/static/music/perfect-girl.mp3" type="audio/mpeg" />
      </video>
    </div>
  </div>
</template>

<script>
import { BigNumber } from 'bignumber.js'
let intList = {}
let timeList = {}
export default {
  name: 'TaskAlert',
  props: ['coinPosition', 'goldStarPosition', 'purpleStarPosition'],
  data () {
    return {
      isMainTaskShow: false,
      isHideTaskShow: false,
      isVariousExpressShow: false,
      isPerfectPronunciationShow: false,
      isApproximateRun: false,
      isPerfectRun: false
    }
  },
  methods: {
    /**
     * @desc 二阶贝塞尔
     * @param {number} t 当前百分比
     * @param {Array} p1 起点坐标
     * @param {Array} p2 终点坐标
     * @param {Array} cp 控制点
     */
    twoBezier (time, p1, p2, cp = [p1[0], p2[1]]) {
      const [x1, y1] = p1
      const [cx, cy] = cp
      const [x2, y2] = p2

      const bezierCount = (t, x, y, c) =>
        new BigNumber(1 - t)
          .times(1 - t)
          .times(x)
          .plus(
            new BigNumber(2)
              .times(t)
              .times(1 - t)
              .times(c)
          )
          .plus(new BigNumber(t).times(t).times(y))

      let x = bezierCount(time, x1, x2, cx)
      let y = bezierCount(time, y1, y2, cy)
      return [x.decimalPlaces(4).toNumber(), y.decimalPlaces(4).toNumber()]
    },
    getTwoBezierPositions (time, start, end) {
      let countArr = []
      for (let i = 1; i <= time; i++) {
        countArr.push(this.twoBezier(i / time, start, end))
      }
      return countArr
    },
    arcAnimate (list, hiddenDom) {
      list.forEach(
        (item, index) =>
          (timeList['arcAnimate' + item.type] = setTimeout(() => {
            const { dom, type, endPosition, startPosition } = item
            const posotionArr = this.getTwoBezierPositions(
              110,
              startPosition,
              endPosition
            )
            let j = 0
            // 设置基本数据
            if (
              type === 'purpleStar1' ||
              type === 'purpleStar2' ||
              type === 'goldStar'
            ) {
              dom.style.width = '50px'
              dom.style.height = '50px'
            } else {
              dom.style.width = '38px'
              dom.style.height = '38px'
            }
            dom.style.left = startPosition[0]
            dom.style.top = startPosition[1]
            intList['arcPosition' + type] = setInterval(() => {
              const top = parseFloat(dom.style.top)
              if (top <= endPosition[1]) {
                clearInterval(intList['arcPosition' + type])
                clearTimeout(timeList['arcAnimate' + type])
                intList['arcPosition' + type] = null
                timeList['arcAnimate' + type] = null
                dom.style.left = endPosition[0] + 'px'
                dom.style.top = endPosition[1] + 'px'
                if (
                  type === 'purpleStar1' ||
                  type === 'purpleStar2' ||
                  type === 'goldStar'
                ) {
                  dom.style.width = '36px'
                  dom.style.height = '36px'
                } else {
                  dom.style.width = '24px'
                  dom.style.height = '24px'
                }
                dom.classList.remove('moveStar1')
                dom.classList.remove('moveCoin1')
                dom.classList.remove('moveCoin2')
                dom.classList.remove('moveCoin3')
                dom.classList.remove('moveCoin4')
                dom.classList.remove('moveCoin5')
                dom.classList.remove('moveStar1')
                dom.classList.remove('moveStar2')
                dom.classList.add('sizeStarCoin')
                setTimeout(() => {
                  dom.classList.remove('sizeStarCoin')
                  hiddenDom.classList.add('hiddenTaskImg')
                }, 500)
                setTimeout(() => this.stopAnimate(), 1000)
              } else {
                dom.style.left = posotionArr[j][0] + 'px'
                dom.style.top = posotionArr[j][1] + 'px'
                dom.style.width = parseFloat(dom.style.width) - 0.127 + 'px'
                dom.style.height = parseFloat(dom.style.height) - 0.127 + 'px'
                j++
              }
            }, 10)
          }, 200 * index))
      )
    },
    stopAnimate () {
      // 清除定时器
      for (let i in intList) {
        if (intList[i]) {
          clearInterval(intList[i])
        }
      }
      for (let i in timeList) {
        if (timeList[i]) {
          clearTimeout(timeList[i])
        }
      }
      intList = {}
      timeList = {}
      // 还原位置
      // taskAnimate
      const taskList = [
        this.$refs.mainTask,
        this.$refs.hideTask,
        this.$refs.variousExpress
      ]
      taskList.forEach((dom) => {
        dom.classList.remove('moveTaskImg')
        dom.classList.remove('hiddenTaskImg')
      })
      this.$refs.perfectPronunciation.classList.remove('moveBubbleImg')
      this.$refs.perfectPronunciation.classList.remove('hiddenTaskImg')
      // coinAnimate
      const starCoinList = [
        { dom: this.$refs.goldStar, className: 'moveStar1' },
        { dom: this.$refs.purpleStar1, className: 'moveStar1' },
        { dom: this.$refs.purpleStar2, className: 'moveStar2' },
        { dom: this.$refs.coin1, className: 'moveCoin1' },
        { dom: this.$refs.coin2, className: 'moveCoin2' },
        { dom: this.$refs.coin3, className: 'moveCoin3' },
        { dom: this.$refs.coin4, className: 'moveCoin4' },
        { dom: this.$refs.coin5, className: 'moveCoin5' }
      ]
      starCoinList.forEach(({ dom, className }) => {
        dom.classList.remove(className)
        dom.classList.remove('sizeStarCoin')
        dom.style.left = null
        dom.style.top = null
        dom.style.width = null
        dom.style.height = null
      })
      // 还原dom
      this.isMainTaskShow = false
      this.isHideTaskShow = false
      this.isVariousExpressShow = false
      this.isPerfectPronunciationShow = false
    },
    showAnimate (type) {
      this.stopAnimate()
      const vh = document.body.clientHeight
      const vw = document.body.clientWidth
      // 提示语上移
      switch (type) {
        case 'mainTask':
          this.isMainTaskShow = true
          this.$refs.mainTask.classList.add('moveTaskImg')
          break
        case 'hideTask':
          this.isHideTaskShow = true
          this.$refs.hideTask.classList.add('moveTaskImg')
          break
        case 'variousExpress':
          this.isVariousExpressShow = true
          this.$refs.variousExpress.classList.add('moveTaskImg')
          break
        case 'perfectPronunciation':
          this.isPerfectPronunciationShow = true
          this.$refs.perfectPronunciation.classList.add('moveBubbleImg')
          break
      }
      this.showVoice(type)
      setTimeout(() => {
        switch (type) {
          case 'mainTask':
            // 星星显示，上移
            timeList['goldStar'] = setTimeout(() => {
              this.$refs.goldStar.classList.add('moveStar1')
            }, 600)
            // 金币显示，右移
            timeList['coinInt1'] = setTimeout(() => {
              this.$refs.coin1.classList.add('moveCoin1')
            }, 1400)
            timeList['coinInt2'] = setTimeout(() => {
              this.$refs.coin2.classList.add('moveCoin2')
            }, 1600)
            timeList['coinInt3'] = setTimeout(() => {
              this.$refs.coin3.classList.add('moveCoin3')
            }, 1800)
            timeList['arcTime'] = setTimeout(
              () =>
                this.arcAnimate(
                  [
                    {
                      dom: this.$refs.goldStar,
                      endPosition: this.goldStarPosition,
                      startPosition: [vw / 2 - 102, vh - 286],
                      type: 'goldStar'
                    },
                    {
                      dom: this.$refs.coin1,
                      endPosition: this.coinPosition,
                      startPosition: [vw / 2 - 42, vh - 280],
                      type: 'coin1'
                    },
                    {
                      dom: this.$refs.coin2,
                      endPosition: this.coinPosition,
                      startPosition: [vw / 2 + 4, vh - 280],
                      type: 'coin2'
                    },
                    {
                      dom: this.$refs.coin3,
                      endPosition: this.coinPosition,
                      startPosition: [vw / 2 + 50, vh - 280],
                      type: 'coin3'
                    }
                  ],
                  this.$refs[type]
                ),
              2200
            )
            break
          case 'hideTask':
          case 'variousExpress':
            // 星星显示，上移
            timeList['purpleStar1'] = setTimeout(() => {
              this.$refs.purpleStar1.classList.add('moveStar1')
            }, 600)
            // 金币显示，右移
            timeList['coinInt4'] = setTimeout(() => {
              this.$refs.coin4.classList.add('moveCoin4')
            }, 1400)
            timeList['arcTime'] = setTimeout(
              () =>
                this.arcAnimate(
                  [
                    {
                      dom: this.$refs.coin4,
                      endPosition: this.coinPosition,
                      startPosition: [vw / 2 + 24, vh - 280],
                      type: 'coin4'
                    },
                    {
                      dom: this.$refs.purpleStar1,
                      endPosition: this.purpleStarPosition,
                      startPosition: [vw / 2 - 102, vh - 286],
                      type: 'purpleStar1'
                    }
                  ],
                  this.$refs[type]
                ),
              1900
            )
            break
          case 'perfectPronunciation':
            // 星星显示，上移
            timeList['purpleStar2'] = setTimeout(() => {
              this.$refs.purpleStar2.classList.add('moveStar2')
            }, 600)
            // 金币显示，右移
            timeList['coin5'] = setTimeout(() => {
              this.$refs.coin5.classList.add('moveCoin5')
            }, 1400)
            timeList['arcTime'] = setTimeout(
              () =>
                this.arcAnimate(
                  [
                    {
                      dom: this.$refs.coin5,
                      endPosition: this.coinPosition,
                      startPosition: [200, vh - 492],
                      type: 'coin5'
                    },
                    {
                      dom: this.$refs.purpleStar2,
                      endPosition: this.purpleStarPosition,
                      startPosition: [80, vh - 498],
                      type: 'purpleStar2'
                    }
                  ],
                  this.$refs[type]
                ),
              1900
            )
            break
        }
      }, 500)
    },
    showBubble (type) {
      switch (type) {
        case 'approximatePronunciation':
          this.isApproximateRun = true
          setTimeout(() => {
            this.isApproximateRun = false
          }, 2300)
          break
        case 'perfectPronunciation':
          this.isPerfectRun = true
          setTimeout(() => {
            this.isPerfectRun = false
          }, 2300)
          break
      }
    },
    showVoice (type) {
      switch (type) {
        case 'mainTask':
          this.$refs.mainTaskAudio.play()
          break
        case 'hideTask':
          this.$refs.hideTaskAudio.play()
          break
        case 'variousExpress':
          this.$refs.variousExpressAudio.play()
          break
        case 'passAll':
          this.$refs.passAllAudio.play()
          break
      }
    }
  },
  mounted () {
    document.body.addEventListener(
      'mousedown',
      () => {
        this.$refs.mainTaskAudio.muted = false
        this.$refs.hideTaskAudio.muted = false
        this.$refs.variousExpressAudio.muted = false
        this.$refs.passAllAudio.muted = false
      },
      false
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.purpleStar1,
.purpleStar2,
.goldStar,
.coin1,
.coin2,
.coin3,
.coin4,
.coin5,
.variousExpress,
.hideTask,
.mainTask,
.perfectPronunciation {
  position: fixed;
  animation-timing-function: ease-in-out;
  opacity: 0;
}
.purpleStar1,
.purpleStar2,
.goldStar {
  width: 50px;
  height: 50px;
  left: calc(50vw - 102px);
  top: calc(100vh - 220px);
}
.purpleStar2 {
  left: 80px;
  top: calc(100vh - 400px);
}
.moveStar1,
.moveStar2,
.moveTaskImg,
.hiddenTaskImg {
  animation-duration: 0.5s;
}
.moveStar1 {
  animation-name: moveStar1;
  top: calc(100vh - 286px);
  opacity: 1;
}
.moveStar2 {
  animation-name: moveStar2;
  top: calc(100vh - 498px);
  opacity: 1;
}
.sizeStarCoin {
  animation-name: sizeStarCoin;
  animation-duration: 0.3s;
  opacity: 1;
}
.coin1,
.coin2,
.coin3,
.coin4,
.coin5 {
  width: 38px;
  height: 38px;
  top: calc(100vh - 280px);
  left: calc(50vw - 96px);
}
.coin5 {
  top: calc(100vh - 492px);
  left: 86px;
}
.moveCoin1,
.moveCoin2,
.moveCoin3,
.moveCoin5,
.moveCoin4 {
  animation-duration: 0.4s;
  opacity: 1;
}
.moveCoin1 {
  animation-name: moveCoin1;
  left: calc(50vw - 42px);
}
.moveCoin2 {
  animation-name: moveCoin2;
  left: calc(50vw + 4px);
}
.moveCoin3 {
  animation-name: moveCoin3;
  left: calc(50vw + 50px);
}
.moveCoin4 {
  animation-name: moveCoin4;
  left: calc(50vw + 24px);
}
.moveCoin5 {
  animation-name: moveCoin5;
  left: 200px;
}
.mainTask,
.variousExpress,
.hideTask {
  top: 100vh;
  opacity: 1;
}
.mainTask {
  width: 56vw;
  left: 22vw;
}
.variousExpress {
  width: 68vw;
  left: 16vw;
}
.hideTask {
  width: 56vw;
  left: 22vw;
}
.moveTaskImg {
  animation-name: moveTaskImg;
  top: calc(100vh - 220px);
}
.perfectPronunciation {
  top: calc(100vh - 220px);
  width: 90px;
  height: 90px;
  left: 60px;
}
.moveBubbleImg {
  animation-name: moveBubbleImg;
  animation-duration: 0.7s;
  top: calc(100vh - 420px);
  opacity: 1;
}
.hiddenTaskImg {
  animation-name: hiddenTaskImg;
  opacity: 0;
}
.approximatePro,
.perfectPro {
  position: fixed;
  width: 75px;
  height: 75px;
  bottom: 220px;
  opacity: 0;
  animation-duration: 2.3s;
  animation-timing-function: linear;
}
.approximatePro {
  right: 40px;
}
.perfectPro {
  left: 40px;
}
.proAnimate {
  animation-name: proAnimate;
}
.videoList {
  position: fixed;
  top: 100vh;
}
@keyframes moveCoin1 {
  0% {
    left: calc(50vw - 96px);
  }
  100% {
    left: calc(50vw - 42px);
  }
}
@keyframes moveCoin2 {
  0% {
    left: calc(50vw - 96px);
    opacity: 1;
  }
  100% {
    left: calc(50vw +4px);
  }
}
@keyframes moveCoin3 {
  0% {
    left: calc(50vw - 96px);
  }
  100% {
    left: calc(50vw + 50px);
  }
}
@keyframes moveCoin4 {
  0% {
    left: calc(50vw - 96px);
  }
  100% {
    left: calc(50vw + 24px);
  }
}
@keyframes moveCoin5 {
  0% {
    left: 86px;
  }
  100% {
    left: 200px;
  }
}
@keyframes sizeStarCoin {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.6);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes moveStar1 {
  0% {
    top: calc(100vh - 220px);
    opacity: 0;
  }
  100% {
    top: calc(100vh - 286px);
    opacity: 1;
  }
}
@keyframes moveStar2 {
  0% {
    top: calc(100vh - 400px);
    opacity: 0;
  }
  100% {
    top: calc(100vh - 498px);
    opacity: 1;
  }
}
@keyframes moveBubbleImg {
  0% {
    top: calc(100vh - 220px);
    opacity: 0;
  }
  100% {
    top: calc(100vh - 420px);
    opacity: 1;
  }
}
@keyframes moveTaskImg {
  0% {
    top: 100vh;
  }
  100% {
    top: calc(100vh - 220px);
  }
}
@keyframes hiddenTaskImg {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes proAnimate {
  0% {
    bottom: 270px;
    opacity: 0;
  }

  50% {
    bottom: 330px;
    opacity: 1;
  }

  100% {
    bottom: 390px;
    opacity: 0;
  }
}
</style>
