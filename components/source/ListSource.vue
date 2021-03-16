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
const url = 'http://candidate-manage.herokuapp.com/api/sources'
export default {
  name: 'ListSource',
  components: { ListDataTable },
  data () {
    return {
      url,
      items: [],
      fields: ['id', 'name', 'created_at',
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
