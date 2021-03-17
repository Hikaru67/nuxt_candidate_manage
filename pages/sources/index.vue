<template>
  <ListSource :list-sources="listSources" />
</template>

<script>

import ListSource from '~/components/source/ListSource'
import { apiGetSource } from '~/api/baseData'

export default {
  name: 'Index',
  components: { ListSource },
  data () {
    return {
      listSources: []
    }
  },
  beforeCreate () {
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  },
  async created () {
    this.listSources = await apiGetSource(this.$axios)
  }
}
</script>

<style scoped>

</style>
