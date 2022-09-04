<template>
  <div class="paginator">
    <button
      class="paginator__button"
      :disabled="paginatorValue === 0"
      @click="paginatorValue--"
    >
      <svg-sprite name="chevron-right" />
      Назад
    </button>

    <button
      class="paginator__button"
      :disabled="paginatorValue === maxValue"
      @click="paginatorValue++"
    >
      Далее
      <svg-sprite name="chevron-right" />
    </button>
  </div>
</template>

<script>
import SvgSprite from '@/components/common/SvgSprite'

export default {
  name: 'WidgetBodyPaginator',
  components: { SvgSprite },

  props: {
    value: {
      type: Number,
      required: true,
      validator: (value) => value >= 0
    },

    maxValue: {
      type: Number,
      required: true
    }
  },

  computed: {
    paginatorValue: {
      get() {
        return this.value
      },

      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.paginator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 35px;

  &__button {
    border-radius: 8px;
    padding: 10px 0 8px;
    width: 112px;
    height: 34px;
    box-shadow: 0 5px 6px $shadow;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: $black;
    background: $white;

    svg {
      margin-left: 6px;
      fill: $black;
    }

    &:disabled {
      color: $gray-disabled;
      background: $white-disabled;

      svg {
        fill: $gray-disabled;
      }
    }

    &:first-child {
      margin-right: 19px;

      svg {
        margin-right: 6px;
        margin-left: 0;
        transform: rotate(180deg);
      }
    }
  }
}
</style>
