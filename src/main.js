import Vue from "vue";
import App from "./layout/App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/css/index.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
