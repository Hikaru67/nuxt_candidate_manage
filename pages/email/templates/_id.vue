<template>
  <AddTemplate :single-template="singleTemplate" />
</template>

<script>

import AddTemplate from '~/components/email/template/AddTemplate'
import { apiGetEmailTemplatesById } from '~/api/apiEmail'

export default {
  name: 'Id',
  components: { AddTemplate },
  data () {
    return {
      singleTemplate: {}
    }
  },
  beforeCreate () {
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  },
  created () {
    this.singleTemplate = apiGetEmailTemplatesById(this.$axios, this.$route.params.id)
  }
}
</script>

<style scoped>

</style>
