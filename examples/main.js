import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 导入组件
import vueCanvasPosterYufan from '../packages/index';

Vue.use(vueCanvasPosterYufan);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
