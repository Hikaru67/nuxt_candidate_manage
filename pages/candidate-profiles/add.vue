<template>
  <AddTemplate />
</template>

<script>

import AddTemplate from '../../components/candidate/CreateEdit'
export default {
  data () {
    return {
      dataCandidate: []
    }
  },
  
  name: 'Add',

  components: { AddTemplate },

  beforeCreate () {
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  },

  mounted() {
    
  },
}
</script>

<style scoped></style>
