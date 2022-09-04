import Axios from 'axios'

Axios.interceptors.request.use((config) => {
  config.headers.apikey = 'ZEbFmfYR1tScGGPakQW3bYcoqY5Of2ZQ'
  return config
})

export default {
  install(Vue) {
    Vue.prototype.$axios = Axios
  }
}
