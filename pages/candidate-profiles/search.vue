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
  },
};
</script>

<style>
</style>