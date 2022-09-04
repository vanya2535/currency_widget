function $costMask(cost) {
  return cost
    ? cost
        .toString()
        .replace(/\s/g, '')
        .replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
    : cost
}

export default {
  install(Vue) {
    Vue.prototype.$costMask = $costMask
  }
}
