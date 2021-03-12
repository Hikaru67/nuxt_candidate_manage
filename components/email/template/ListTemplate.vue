<template>
  <CCard>
    <CCardHeader>
      <h3>List Email Templates</h3>
    </CCardHeader>
    <CCardBody>
      <ListDataTable :url="url" :fields="fields" />
    </CCardBody>
  </CCard>
</template>

<script>
import ListDataTable from '~/components/ListDataTable'
const url = 'http://127.0.0.1:8000/api/email-templates/'
export default {
  name: 'ListTemplate',
  components: { ListDataTable },
  data () {
    return {
      url,
      items: [],
      fields: ['id', 'name', 'title', 'created_at',
        {
          key: 'action',
          label: ''
        }]
    }
  }
}
</script>

<style scoped>

</style>
