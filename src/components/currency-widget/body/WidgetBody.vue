<template>
  <div class="body">
    <widget-body-input
      v-model="multiplier"
      :selected-currency="selectedCurrency || ''"
    />

    <div
      class="body__currency-items"
      @touchstart="touchStartPosition = $event.changedTouches[0].clientX"
      @touchend="onTouchEnd"
    >
      <div
        :class="{ 'body__currency-row': nextPage !== page }"
        :style="currencyGridStyle"
      >
        <div v-if="nextPage < page" class="body__currency-grid">
          <widget-body-currency-item
            v-for="currency of getPageCurrencies(nextPage)"
            :key="currency.name"
            :multiplier="multiplier || 1"
            :currency="currency"
            :selected-currency="selectedCurrency || ''"
          />
        </div>

        <div class="body__currency-grid">
          <widget-body-currency-item
            v-for="currency of getPageCurrencies(page)"
            :key="currency.name"
            :multiplier="multiplier || 1"
            :currency="currency"
            :selected-currency="selectedCurrency || ''"
          />
        </div>

        <div v-if="nextPage > page" class="body__currency-grid">
          <widget-body-currency-item
            v-for="currency of getPageCurrencies(nextPage)"
            :key="currency.name"
            :multiplier="multiplier || 1"
            :currency="currency"
            :selected-currency="selectedCurrency || ''"
          />
        </div>
      </div>
    </div>

    <widget-body-paginator
      v-show="maxPage !== 0"
      :value="page"
      :max-value="maxPage"
      @input="changePage"
    />
  </div>
</template>

<script>
import WidgetBodyInput from './WidgetBodyInput'
import WidgetBodyCurrencyItem from './WidgetBodyCurrencyItem'
import WidgetBodyPaginator from './WidgetBodyPaginator'

export default {
  name: 'WidgetBody',
  components: { WidgetBodyInput, WidgetBodyCurrencyItem, WidgetBodyPaginator },

  props: {
    currencies: {
      type: Object,
      requried: true,

      validator: (currencies) =>
        Object.keys(currencies).every((currency) => currency.length === 3) &&
        Object.values(currencies).every(
          (currencyValue) => typeof currencyValue === 'number'
        )
    },

    selectedCurrency: {
      type: String,
      required: true,
      validator: (currency) => [0, 3].includes(currency.length)
    }
  },

  data() {
    return {
      multiplier: 1,
      page: 0,
      nextPage: 0,
      currencyGridStyle: '',
      touchStartPosition: null
    }
  },

  inject: ['matchMedia'],

  computed: {
    perPage() {
      if (this.matchMedia(720)) {
        return 4
      } else {
        return 2
      }
    },

    maxPage() {
      return this.currencies
        ? Math.floor(Object.keys(this.currencies).length / this.perPage)
        : 0
    }
  },

  methods: {
    changePage(page) {
      this.nextPage = page

      if (this.nextPage > this.page) {
        this.currencyGridStyle = `transform: translateX(calc(-100% - 30px)); transition: 0.21s;`
      } else {
        this.currencyGridStyle = `transform: translateX(calc(-100% - 30px))`

        setTimeout(() => {
          this.currencyGridStyle = `transition: 0.21s`
        })
      }

      setTimeout(() => {
        this.page = page
        this.currencyGridStyle = ''
      }, 200)
    },

    getPageCurrencies(page) {
      return this.currencies
        ? Object.entries(this.currencies)
            .map(([name, value]) => ({
              name,
              value
            }))
            .slice(this.perPage * page, this.perPage + this.perPage * page)
        : []
    },

    onTouchEnd(e) {
      if (
        e.changedTouches[0].clientX > this.touchStartPosition &&
        this.page > 0
      ) {
        this.changePage(this.page - 1)
      } else if (
        e.changedTouches[0].clientX < this.touchStartPosition &&
        this.page < this.maxPage
      ) {
        this.changePage(this.page + 1)
      }
      this.touchStartPosition = null
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  padding-top: 29px;
  height: 471px;
  background: $white;

  &__currency-items {
    overflow: hidden;
    margin-top: 23px;
    padding: 0 24px 6px;
    width: 100%;

    @media (max-width: 719px) {
      padding-right: 22px;
    }
  }

  &__currency-row {
    display: grid;
    column-gap: 30px;
    grid-template-columns: repeat(2, 100%);
  }

  &__currency-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 18px;

    @media (max-width: 719px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
