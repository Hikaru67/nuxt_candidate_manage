<template>
  <AddTemplate />
</template>

<script>

import AddTemplate from '~/components/email/template/AddTemplate'
export default {
  name: 'Add',
  components: { AddTemplate },
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
