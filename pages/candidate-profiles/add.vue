<template>
  <AddTemplate />
</template>

<script>
import AddTemplate from '../../components/candidate/CreateEdit'
export default {

  name: 'Add',

  components: { AddTemplate },
  data () {
    return {
      dataCandidate: []
    }
  },

  beforeCreate () {
    // redirect if current role isn't hr
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
      // testsad
    }
  },

  mounted () {}
}
</script>

<style scoped></style>
