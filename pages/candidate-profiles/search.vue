<template>
  <div>
    <SearchCadidate @search="getSearchForm"/>
  </div>
</template>

<script>
import SearchCadidate from "../../components/candidate/Search"

export default {
  data() {
    return {
      searchForm: {},
    };
  },

  components: {
    SearchCadidate,
  },

  methods: {
    getSearchForm(data) {
      this.searchForm = data;
      // eslint-disable-next-line no-console
      console.log(this.searchForm)
    },
    
    /**
     * updatePage update dataCandidate by page
     * @param page String
     * @return boolean
     */
    updatePage (page) {
      axios
        .get(URL_CANDIDATE_PROFILES + '?page=' + page)
        .then((response) => {
          this.dataCandidate = response.data
          console.log(this.dataCandidate)
          // console.log(this.dataCandidate);
        })
    }
  },
};
</script>

<style>
</style>