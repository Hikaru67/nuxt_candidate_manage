<template>
  <CCard>
    <CCardHeader>
      <h3>List Email Templates</h3>
    </CCardHeader>
    <CCardBody>
      <ListSource :list-sources="listSources" @update_data="updateData" />
    </CCardBody>
  </CCard>
</template>

<script>

import ListSource from '~/components/source/ListSource'
import { apiGetSource } from '~/api/apiSource'

export default {
  name: 'Index',
  components: { ListSource },
  data () {
    return {
      listSources: []
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
  created () {
    // call func getListSources
    this.getListSources()
  },
  methods: {
    /**
     * `getListSources` will call api get list sources
     */
    async getListSources () {
      this.listSources = await apiGetSource(this.$axios)
    },

    /**
     * updateData update call func get list email templates
     */
    updateData () {
      this.getListSources()
    }
  }
}
</script>

<style scoped>

</style>
