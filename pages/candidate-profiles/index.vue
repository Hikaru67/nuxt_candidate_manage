<template>
  <ListTemplate :DATA="this.dataCandidate" />
</template>

<script>
import ListTemplate from "../../components/candidate/ListTemplate";

export default {
  name: "Index",

  data () {
    return {
      dataCandidate: []
    }
  },

  components: { ListTemplate },

  mounted() {
    axios
      .get(this.$store.state.url.API_CANDIDATE_PROFILES_URL)
      .then((response) => {
        this.dataCandidate = response.data;
      });
  },
};
</script>

<style scoped></style>
