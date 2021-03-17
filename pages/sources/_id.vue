<template>
  <EditSource />
</template>

<script>
import EditSource from '~/components/source/AddSource'

export default {
  name: 'Id',
  components: { EditSource },
  beforeCreate () {
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  }
}
</script>

<style scoped>

</style>
