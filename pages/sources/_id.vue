<template>
  <div>
    {{ singleSource }}
    <AddSource :single-source="singleSource" />
  </div>
</template>

<script>
import AddSource from '~/components/source/AddSource'
import { apiGetSourceById } from '~/api/apiSource'

export default {
  name: 'Id',
  components: { AddSource },
  data () {
    return {
      singleSource: { name: '' }
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
    this.singleSource = await apiGetSourceById(this.$axios, this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
