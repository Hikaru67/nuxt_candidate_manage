<template>
  <SendEmail :list-templates="listProfiles" :list-profiles="listProfiles" />
</template>

<script>
import SendEmail from '~/components/email/template/SendEmail'
import { apiGetCandidateProfiles, apiGetEmailTemplates } from '~/api/baseData'
export default {
  name: 'Send',
  components: {
    SendEmail
  },
  data () {
    return {
      listTemplates: [],
      listProfiles: []
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
    this.listTemplates = apiGetEmailTemplates(this.$axios)
    this.listProfiles = apiGetCandidateProfiles(this.$axios)
    console.log(this.listTemplates)
  }
}
</script>

<style scoped>

</style>
