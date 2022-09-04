import Vue from 'vue'
import App from './App.vue'

import axios from '@/plugins/axios'
import globalFunctions from '@/plugins/globalFunctions'

import '@/assets/css/nullstyle.css'
import '@/assets/css/fonts.css'

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(globalFunctions)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
