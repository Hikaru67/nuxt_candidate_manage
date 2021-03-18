<template>
  <EditProfile />
</template>

<script>

import EditProfile from '../../components/candidate/CreateEditProfile'
export default {
  name: 'Id',
  components: { EditProfile },
  beforeCreate () {
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  }
}
</script>

<style scoped></style>
