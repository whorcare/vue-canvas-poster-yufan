// 为组件提供 install 方法，供组件对外按需引入
import vueCanvasPosterYufan from './src/vueCanvasPosterYufan.vue';

vueCanvasPosterYufan.install = (Vue) => {
  Vue.component(vueCanvasPosterYufan.name, vueCanvasPosterYufan);
};
export default vueCanvasPosterYufan;
