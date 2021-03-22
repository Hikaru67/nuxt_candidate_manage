<template>
  <div>
    <SearchCadidate @search="getSearchForm($event)" />
    <CCard>
      <CCardHeader class="center">
        <h3>List Profile</h3>
      </CCardHeader>

      <CCardBody>
        <ListCandidate
          :DATA="dataCandidate"
          @change_page="changePage($event)"
          @update_data="updateData"
        />
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import axios from 'axios'
import SearchCadidate from '../../components/candidate/Search'
import ListCandidate from '../../components/candidate/List'
import { URL_CANDIDATE_PROFILES } from '~/common/constant/url'
import { apiSearchCandidateProfiles } from '~/api/apiCandidate'

export default {

  components: {
    SearchCadidate,
    ListCandidate
  },
  data () {
    return {
      searchForm: {},
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
      axios.get(URL_CANDIDATE_PROFILES + '?page=' + page).then((response) => {
        this.dataCandidate = response.data
      })
    },

    /**
     * `getSearchForm` will get form search data and send api search candidate profile
     * @param form Object
     */
    async getSearchForm (form) {
      this.condition = ''
      Object.entries(form).forEach((value) => {
        if (value[1]) { this.condition += value[0] + '=' + value[1] + '&' }
      })
      this.dataCandidate = await apiSearchCandidateProfiles(this.$axios, this.condition)
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

<style>
</style>
