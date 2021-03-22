<template>
  <div>
    <SearchEmail @search="getSearchForm($event)" />
    <CCard>
      <CCardHeader>
        <h3>List Email Templates</h3>
      </CCardHeader>
      <CCardBody>
        <ListTemplate :list-templates="listTemplates" @update_data="updateData" />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import ListTemplate from '~/components/email/template/ListTemplate'
import SearchEmail from '~/components/email/template/SearchEmail'
import { apiGetEmailTemplates, apiSearchEmailTemplates } from '~/api/apiEmail'

export default {
  name: 'Index',
  components: { ListTemplate, SearchEmail },
  data () {
    return {
      searchForm: {},
      listTemplates: []
    }
  },

  beforeCreate () {
    // redirect if current role isn't hr
    if (this.$auth.user.role_id !== 1) {
      alert('You dont have permission !')
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/dashboard'
    }
  },

  // call api get list email templates
  created () {
    this.getListTemplates()
  },

  methods: {
    /**
     * `getListTemplates` will call api get list email templates
     */
    async getListTemplates () {
      this.listTemplates = await apiGetEmailTemplates(this.$axios)
    },

    /**
     * `getSearchForm` will get form search data and send api search candidate profile
     * @param form Object
     */
    async getSearchForm (form) {
      let condition = ''
      Object.entries(form).forEach((value) => {
        if (value[1]) { condition += value[0] + '=' + value[1] + '&' }
      })
      this.listTemplates = await apiSearchEmailTemplates(this.$axios, condition)
    },

    /**
     * updateData update call func get list email templates
     */
    updateData () {
      this.getListTemplates()
    }
  }
}
</script>

<style scoped>

</style>
