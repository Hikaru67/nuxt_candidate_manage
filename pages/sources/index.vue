<template>
  <CCard>
    <CCard>
      <CCardBody>
        <Search @search="getSearchForm($event)" />
      </CCardBody>
      {{ condition }}
      <br>
      {{ listProfiles }}
    </CCard>
    <CCardHeader>
      <h3>List Email Templates</h3>
    </CCardHeader>
    <CCardBody>
      <ListSource :list-sources="listSources" />
    </CCardBody>
  </CCard>
</template>

<script>

import ListSource from '~/components/source/ListSource'
import Search from '~/components/candidate/Search'


export default {
  name: 'Index',
  components: { ListSource, Search },
  data () {
    return {
      condition: '',
      listSources: [],
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
    this.listSources = await apiGetSource(this.$axios)
  },
  methods: {
    async getSearchForm (form) {
      this.condition = ''
      Object.entries(form).forEach((value) => {
        if (value[1]) { this.condition += value[0] + '=' + value[1] + '&' }
      })
      this.listProfiles = await apiSearchCandidateProfiles(this.$axios, this.condition)
      console.log(this.listProfiles)
    }
  }
}
</script>

<style scoped>

</style>
