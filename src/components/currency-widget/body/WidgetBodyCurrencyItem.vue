<template>
  <div class="currency-item">
    <div class="currency-item__top">
      {{ $costMask(multiplier) }}
      <span class="currency-name">{{ selectedCurrency }} =</span>
    </div>

    <div class="currency-item__bottom" :style="`font-size: ${fontSize}px`">
      {{ currencyValue }}
      <span class="currency-name">{{ currency.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetCurrencyItem',

  props: {
    multiplier: {
      type: Number,
      required: true,
      validator: (multiplier) => multiplier > 0
    },

    currency: {
      type: Object,
      required: true,
      validator: (currency) =>
        currency.hasOwnProperty('name') && currency.hasOwnProperty('value')
    },

    selectedCurrency: {
      type: String,
      required: true,
      validator: (currency) => currency.length === 3
    }
  },

  inject: ['matchMedia'],

  computed: {
    currencyValue() {
      return this.$costMask(
        (this.multiplier * this.currency.value).toFixed(2).replace('.', ',')
      )
    },

    fontSize() {
      if (this.matchMedia(720)) {
        if (this.currencyValue.length <= 9) {
          return 48
        } else if (this.currencyValue.length <= 14) {
          return 33
        } else {
          return 19
        }
      } else {
        if (this.currencyValue.length <= 9) {
          return 36
        } else if (this.currencyValue.length <= 14) {
          return 26
        } else {
          return 16
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.currency-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 12px;
  padding: 18px 30px 17px;
  height: 138px;
  box-shadow: 0 3px 6px rgba(157, 157, 157, 0.16);
  white-space: nowrap;
  background: #fff;

  &__top {
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.01714px;
    color: $black;

    .currency-name {
      color: $gray;
    }

    @media (max-width: 719px) {
      font-size: 18px;
      line-height: 21px;
      letter-spacing: 0.01285px;
    }
  }

  &__bottom {
    font-weight: 300;
    letter-spacing: 0.03428px;
    color: #2b2d33;

    .currency-name {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: 0.01714px;

      @media (max-width: 719px) {
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.01285px;
      }
    }

    @media (max-width: 719px) {
      letter-spacing: 0.02571px;
    }
  }
}
</style>
