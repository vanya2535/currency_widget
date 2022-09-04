<template>
  <component :is="require(`@/assets/svg/${name}.svg`)" />
</template>

<script>
export default {
  name: 'SvgSprite',

  props: {
    name: {
      type: String,
      required: true,
      validator: (name) => !name.includes('/') && !name.includes('.')
    }
  }
}
</script>
