<template>
  <div class="toolbar">
    <h1 class="toolbar__title">Курс {{ selectedCurrency }} на {{ date }}</h1>

    <widget-toolbar-tabs
      :currencies="currencies"
      :selected-currency="selectedCurrency"
      @select="$emit('select', $event)"
    />
  </div>
</template>

<script>
import WidgetToolbarTabs from './WidgetToolbarTabs'

export default {
  name: 'WidgetToolbar',
  components: { WidgetToolbarTabs },

  props: {
    date: {
      type: String,
      required: true,
      validator: (date) =>
        /[0-9]{4}\.[0-9]{2}\.[0-9]{2}$/.test(date) || date.length === 0
    },

    currencies: {
      type: Array,
      required: true,

      validator: (currencies) =>
        currencies.every((currency) => typeof currency === 'string')
    },

    selectedCurrency: {
      type: String,
      required: true,
      validator: (currency) => [0, 3].includes(currency.length)
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  padding: 30px 0 0 24px;
  height: 111px;
  background: $yellow;

  &__title {
    font-weight: 400;
    font-size: 21px;
    line-height: 25px;
    color: $black;
  }
}
</style>
