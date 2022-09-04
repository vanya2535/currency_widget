<template>
  <div class="widget">
    <widget-toolbar
      :date="currency.date || ''"
      :currencies="allCurrencies"
      :selectedCurrency="currency.base || ''"
      @select="changeBase($event)"
    />

    <widget-body
      :currencies="currency.rates"
      :selectedCurrency="currency.base || ''"
    />
  </div>
</template>

<script>
import WidgetToolbar from './toolbar/WidgetToolbar'
import WidgetBody from './body/WidgetBody'
import matchMedia from '@/mixins/matchMedia'

export default {
  name: 'CurrencyWidget',
  mixins: [matchMedia],

  components: {
    WidgetToolbar,
    WidgetBody
  },

  data() {
    return {
      currency: {}
    }
  },

  provide() {
    return {
      matchMedia: this.matchMedia
    }
  },

  computed: {
    allCurrencies() {
      return this.currency.rates ? Object.keys(this.currency.rates) : []
    }
  },

  methods: {
    async changeBase(base) {
      try {
        const { data } = await this.$axios.get(
          `http://localhost:3000/currencies/${base}`
        )
        data.date = data.date.replaceAll('-', '.')
        this.currency = data
      } catch (e) {
        console.error(e)
      }
    }
  },

  async created() {
    this.changeBase('EUR')
  }
}
</script>

<style lang="scss" scoped>
.widget {
  width: 100%;
  box-shadow: 0 0 6px $shadow;
}
</style>
