<template>
  <CCard>
    <CCardHeader class="center">
      <h3>List Profile</h3>
    </CCardHeader>

    <CCardBody>
      <ListCandidate :d-a-t-a="dataCandidate" />
    </CCardBody>
  </CCard>
</template>

<script>
import axios from 'axios'
import ListCandidate from '~/components/List'
import { URL_CANDIDATE_PROFILES } from '~/common/constant/url'

export default {
  name: 'Test',

  components: { ListCandidate },

  data () {
    return {
      dataCandidate: []
    }
  },

  mounted () {
    axios
      .get(URL_CANDIDATE_PROFILES)
      .then((response) => {
        this.dataCandidate = response.data
        console.log(this.dataCandidate)
        // console.log(this.dataCandidate);
      })
  }
}
</script>

<style scoped></style>
