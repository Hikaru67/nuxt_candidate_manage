<template>
  <CCard>
    <CCardHeader>
      <h3>List Email Templates</h3>
    </CCardHeader>
    <CCardBody>
      <!--      <Search @search="getSearchForm($event)" />-->
      <br>
      <ListTemplate :list-templates="listTemplates" />
    </CCardBody>
  </CCard>
</template>

<script>
import ListTemplate from '~/components/email/template/ListTemplate'
import Search from '~/components/Search'
import { apiGetEmailTemplates } from '~/api/baseData'

export default {
  name: 'Index',
  components: { ListTemplate, Search },
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
  },
  methods: {
    getSearchForm (form) {
      this.searchForm = form
    }
  }
}
</script>

<style scoped>

</style>
