import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//解决移动端点击延迟300ms的问题
import FastClick from 'fastclick'
FastClick.attach(document.body);

//图片懒加载
import vueLazyLoad from 'vue-lazyload'
Vue.use(vueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

//引入toast
import toast from 'components/common/toast'

//安装toast插件
//Vue调用use函数，就是调用插件里的install函数，所以toast的index文件中要有install函数
Vue.use(toast);

Vue.config.productionTip = false

//创建事件总线
Vue.prototype.$bus=new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
