<template>
  <SendEmail :list-templates="listTemplates" :list-profiles="listProfiles.data" />
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
  async created () {
    this.listTemplates = await apiGetEmailTemplates(this.$axios)
    this.listProfiles = await apiGetCandidateProfiles(this.$axios)
  }
}
</script>

<style scoped>

</style>
