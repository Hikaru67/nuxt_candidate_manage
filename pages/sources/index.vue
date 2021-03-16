<template>
  <ListSource />
</template>

<script>

import ListSource from '~/components/source/ListSource'
export default {
  name: 'Index',
  components: { ListSource },
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
