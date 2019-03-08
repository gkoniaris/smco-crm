import Vue from 'vue'
import Autocomplete from 'v-autocomplete' 
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import validators from './validators'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import fetch from './fetch'

validators.register()

Vue.config.productionTip = false

Vue.use(Autocomplete)
Vue.use(Loading)
Vue.component('paginate', Paginate)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// Ping every one minute, for heroku deployments (free dynos sleep)
setInterval(() => {
  return fetch.get('/ping')
}, 60000)