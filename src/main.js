import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import "./customer/assets/index.scss";
import "./customer/assets/sass/style.scss";
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
