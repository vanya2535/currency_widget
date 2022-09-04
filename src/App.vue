<template>
  <div id="app">
    <div class="widget-wrapper">
      <currency-widget />
    </div>
  </div>
</template>

<script>
import CurrencyWidget from '@/components/currency-widget/CurrencyWidget'

export default {
  name: 'App',
  components: { CurrencyWidget }
}
</script>
