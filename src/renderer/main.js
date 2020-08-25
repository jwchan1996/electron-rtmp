import Vue from "vue";
import App from "./App";
import router from "./router";

import antDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import VideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
// custom skin css
import "vue-video-player/src/custom-theme.css";

Vue.use(antDesign);
Vue.use(VideoPlayer);

Vue.config.productionTip = false;

//中央事件总线
const bus = new Vue();
Vue.prototype.bus = bus;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});