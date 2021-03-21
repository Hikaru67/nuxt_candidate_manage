<template>
  <CCard>
    <CCardHeader class="center">
      <h3 v-if="$route.params.id">
        Edit Candidate Profile
      </h3>
      <h3 v-else>
        Create Candidate Profile
      </h3>
    </CCardHeader>

    <AddTemplate />
  </CCard>
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
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  },

  mounted () {}
}
</script>

<style scoped></style>
