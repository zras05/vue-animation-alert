import VueAnimationAlert from './VueAnimationAlert'

// 导出模块
export default VueAnimationAlert

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vue-animation-alert', VueAnimationAlert)
}
