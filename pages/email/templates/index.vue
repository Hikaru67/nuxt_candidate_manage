<template>
  <CCard>
    <CCardHeader>
      <h3>List Email Templates</h3>
    </CCardHeader>
    <CCardBody>
      <ListTemplate :list-templates="listTemplates" />
    </CCardBody>
  </CCard>
</template>

<script>
import ListTemplate from '~/components/email/template/ListTemplate'
import { apiGetEmailTemplates } from '~/api/apiEmail'

export default {
  name: 'Index',
  components: { ListTemplate },
  data () {
    return {
      searchForm: {},
      listTemplates: []
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
  }
}
</script>

<style scoped>

</style>
