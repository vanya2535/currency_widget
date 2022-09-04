<template>
  <div class="tabs">
    <button v-show="step > 0" class="tabs__control" @click="step--">
      <svg-sprite name="chevron-right" />
    </button>

    <div class="tabs__inner">
      <div
        class="tabs__row"
        :style="tabsRowStyle"
        @touchstart="touchStartPosition = $event.changedTouches[0].clientX"
        @touchend="onTouchEnd"
      >
        <button
          v-for="currency of currencies"
          :key="currency"
          tabindex="-1"
          class="tabs__button"
          :class="{ tabs__button_selected: currency === selectedCurrency }"
          @click="$emit('select', currency)"
        >
          {{ currency }}
        </button>
      </div>
    </div>

    <button v-show="!nextButtonHidden" class="tabs__control" @click="step++">
      <svg-sprite name="chevron-right" />
    </button>
  </div>
</template>

<script>
import SvgSprite from '@/components/common/SvgSprite'

let observer

export default {
  name: 'WidgetToolbarTabs',
  components: { SvgSprite },

  props: {
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
  },

  data() {
    return {
      step: 0,
      nextButtonHidden: true
    }
  },

  inject: ['matchMedia'],

  computed: {
    tabsRowStyle() {
      if (this.matchMedia(321)) {
        return `transform: translateX(${-this.step * 90}px)`
      } else {
        return `transform: translateX(${
          -this.step * 90 - (this.step > 0 ? 25 : 0)
        }px)`
      }
    }
  },

  methods: {
    observeTabs() {
      observer.disconnect()
      const lastButton = document.querySelector('.tabs__button:last-child')

      if (lastButton) {
        observer.observe(lastButton)
      }
    },

    onTouchEnd(e) {
      if (
        e.changedTouches[0].clientX > this.touchStartPosition &&
        this.step > 0
      ) {
        this.step--
      } else if (
        e.changedTouches[0].clientX < this.touchStartPosition &&
        !this.nextButtonHidden
      ) {
        this.step++
      }
      this.touchStartPosition = null
    }
  },

  mounted() {
    const options = {
      root: document.querySelector('.tabs__inner'),
      rootMargin: '4000px 0px 4000px 0px',
      threshold: 1.0
    }

    const callback = (entries) => {
      this.nextButtonHidden = entries[0].isIntersecting
    }

    observer = new IntersectionObserver(callback, options)
    this.observeTabs()
  },

  updated() {
    this.observeTabs()
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  margin-left: 22px;
  width: calc(100% - 76px);
  height: 48px;

  &__control {
    position: absolute;
    top: 13.5px;
    z-index: 2;

    svg {
      fill: $beige;
    }

    &:first-child {
      left: -22px;

      svg {
        transform: rotate(180deg);
      }
    }

    &:last-child {
      right: -29px;
    }
  }

  &__inner {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  &__row {
    display: flex;
    height: 100%;
    transition: 0.4s;
  }

  &__button {
    min-width: 90px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: $beige;
    user-select: none;

    &_selected {
      border-radius: 10px 10px 0 0;
      color: $black;
      background: $white;
    }
  }

  @media (max-width: 719px) {
    margin-left: 31px;
    width: calc(100% - 79px);
  }
}
</style>
