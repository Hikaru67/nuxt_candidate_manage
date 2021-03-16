<template>
  <CCard>
    <CCardHeader>
      <h3>List Email Templates</h3>
    </CCardHeader>
    <CCardBody>
      <ListDataTable :url="this.$store.state.url.API_CANDIDATE_PROFILES_URL" :fields="fields" />
    </CCardBody>
  </CCard>
</template>

<script>
import ListDataTable from '~/components/ListDataTable'
const url = 'http://candidate-manage.herokuapp.com/api/candidates-profiles'
export default {
  name: 'ListCandidateProfiles',
  components: { ListDataTable },
  data () {
    return {
      url,
      items: [],
      fields: ['id', 'first_name', 'last_name', 'received_date', 'filtered_result', 'interview_date', 'feedback', 'interview_result', 'created_at',
        {
          key: 'source_id',
          label: 'Source'
        },
        {
          key: 'position_id',
          label: 'Position'
        },
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
