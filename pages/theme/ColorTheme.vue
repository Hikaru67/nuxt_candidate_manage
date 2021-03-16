<template>
  <CCol xl="2" md="4" sm="6" xs="12" class="mb-4">
    <div
      :class="['theme-color w-75 rounded mb-3', color]"
      :style="{ paddingTop: '75%' }"
    />
    <slot />
    <ColorView />
  </CCol>
</template>

<script>
import ColorView from './ColorView'
export default {
  name: 'ColorTheme',
  components: { ColorView },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    color: String
  }
}
</script>
