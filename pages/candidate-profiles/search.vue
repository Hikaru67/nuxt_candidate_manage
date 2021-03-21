<template>
  <div>
    <SearchCadidate @search="getSearchForm($event)" />
    <CCard>
      <CCardHeader class="center">
        <h3>List Profile</h3>
      </CCardHeader>

      <CCardBody>
        <ListCandidate
          :d-a-t-a="dataCandidate"
          @change_page="updatePage($event)"
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
    axios
      .get(URL_CANDIDATE_PROFILES)
      .then((response) => {
        this.dataCandidate = response.data
        // console.log(this.dataCandidate);
      })
  },

  methods: {
    /* getSearchForm (data) {
      this.searchForm = data
      // eslint-disable-next-line no-console
      console.log(this.searchForm)
    }, */

    /**
     * updatePage update dataCandidate by page
     * @param page String
     * @return boolean
     */
    updatePage (page) {
      axios.get(URL_CANDIDATE_PROFILES + '?page=' + page).then((response) => {
        this.dataCandidate = response.data
        console.log(this.dataCandidate)
        // console.log(this.dataCandidate);
      })
    },
    async getSearchForm (form) {
      this.condition = ''
      console.log(form)
      Object.entries(form).forEach((value) => {
        if (value[1]) { this.condition += value[0] + '=' + value[1] + '&' }
      })
      this.dataCandidate = await apiSearchCandidateProfiles(this.$axios, this.condition)
    }
  }
}
</script>

<style>
</style>
