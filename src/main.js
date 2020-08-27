import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import taAdmin from "@/plugin/ta-admin";
Vue.use(taAdmin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
