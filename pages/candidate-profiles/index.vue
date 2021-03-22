<template>
  <CCard>
    <CCardHeader class="center">
      <h3>List Profile</h3>
    </CCardHeader>

    <CCardBody>
      <ListCandidate :DATA="dataCandidate" @change_page="changePage($event)" @update_data="updateData" />
    </CCardBody>
  </CCard>
</template>

<script>
import axios from 'axios'
import ListCandidate from '../../components/candidate/List'
import { URL_CANDIDATE_PROFILES } from '~/common/constant/url'

export default {
  name: 'Index',

  components: { ListCandidate },

  data () {
    return {
      dataCandidate: []
    }
  },

  mounted () {
    this.getListProfile()
  },

  methods: {
    /**
     * getListProfile will call api get list candidate profile
     */
    getListProfile () {
      axios
        .get(URL_CANDIDATE_PROFILES)
        .then((response) => {
          this.dataCandidate = response.data
        })
    },
    
    /**
     * changePage update dataCandidate by page
     * @param page String
     * @return boolean
     */
    changePage (page) {
      axios
        .get(URL_CANDIDATE_PROFILES + '?page=' + page)
        .then((response) => {
          this.dataCandidate = response.data
          console.log(this.dataCandidate)
          // console.log(this.dataCandidate);
        })
    },

    /**
     * updateData update call func get list profile
     */
    updateData () {
      this.getListProfile()
    }
  }
}
</script>

<style scoped></style>
