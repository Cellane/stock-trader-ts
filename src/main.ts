import Vue from "vue"
import VueResource from "vue-resource"
import App from "./App.vue"
import router from "./router"
import store from "./store/store"
import "./filters"

Vue.config.productionTip = false

Vue.use(VueResource)
// @ts-ignore
Vue.http.options.root = "https://vuejs-stock-trader-3667a.firebaseio.com/"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
