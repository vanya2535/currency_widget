export default {
  data() {
    return {
      windowWidth: null
    }
  },

  methods: {
    matchMedia(value) {
      return this.windowWidth >= value
    }
  },

  mounted() {
    this.windowWidth = window.innerWidth

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
  }
}
