<template>
  <SendEmail :list-templates="JSON.parse(JSON.stringify(listTemplates))" :list-profiles="listProfiles.data" />
</template>

<script>
import SendEmail from '~/components/email/template/SendEmail'
import { apiGetCandidateProfiles } from '~/api/apiCandidate'
import { apiGetEmailTemplates } from '~/api/apiEmail'

export default {
  name: 'Send',
  components: {
    SendEmail
  },
  data () {
    return {
      listTemplates: {
        default: []
      },
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
    this.listTemplates = JSON.parse(JSON.stringify(this.listTemplates))
    this.listProfiles = await apiGetCandidateProfiles(this.$axios)
  }
}
</script>

<style scoped>

</style>
