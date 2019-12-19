import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import stringPreviewFilter from './filters/filter.stringPreview'
import createTimeFilter from './filters/filter.createTime'

Vue.config.productionTip = false

Vue.filter('stringPreview', stringPreviewFilter)
Vue.filter('createTime', createTimeFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
