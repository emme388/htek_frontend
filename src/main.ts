import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
// @ts-ignore

Vue.config.productionTip = false


new Vue({
  router,

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  vuetify,

  store,

  // @ts-ignore
  render: h => h(App)
}).$mount('#app')
