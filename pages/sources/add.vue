<template>
  <AddSource />
</template>

<script>
import AddSource from '~/components/source/AddSource'
export default {
  name: 'Add',
  components: { AddSource },
  beforeCreate () {
    // redirect if current role isn't hr
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
