<template>
  <div class="input__wrapper">
    <input
      id="widget-body-input"
      v-model="inputValue"
      tabindex="1"
      type="number"
      inputmode="numeric"
      class="input"
      min="1"
      @keypress="validateKey"
    />

    <label class="input__label" for="widget-body-input">
      {{ selectedCurrency }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'WidgetBodyInput',

  props: {
    value: {
      type: Number,
      required: true
    },

    selectedCurrency: {
      type: String,
      required: true,
      validator: (currency) => [0, 3].includes(currency.length)
    }
  },

  computed: {
    inputValue: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', Number(value))
      }
    }
  },

  methods: {
    validateKey(e) {
      if (
        (!/[0-9]/.test(e.key) || e.target.value.length === 12) &&
        ![
          'Backspace',
          'Delete',
          'ArrowLeft',
          'ArrowRight',
          'Home',
          'End'
        ].includes(e.key)
      ) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  margin-right: 4px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  border-radius: 0;
  padding-bottom: 4px;
  width: 121px;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: end;
  color: $black;
  background: $white;

  &__wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding-right: 24px;
    height: 26px;
  }

  &__label {
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: $gray;

    @media (max-width: 719px) {
      font-size: 14px;
      line-height: 16px;
    }
  }

  @media (max-width: 719px) {
    padding-bottom: 6px;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
