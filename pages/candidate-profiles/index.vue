<template>
<CCard>
    <CCardHeader class="center">
      <h3>List Profile</h3>
    </CCardHeader>

    <CCardBody>
      <ListCandidate :DATA="this.dataCandidate" />
    </CCardBody>
  </CCard>
</template>

<script>
import axios from "axios";
import ListCandidate from "../../components/candidate/List";

export default {
  name: "Index",

  data () {
    return {
      dataCandidate: []
    }
  },

  components: { ListCandidate },

  mounted() {
    axios
      .get(this.$store.state.url.API_CANDIDATE_PROFILES_URL)
      .then((response) => {
        this.dataCandidate = response.data;
        // console.log(this.dataCandidate);
      });
  },
};
</script>

<style scoped></style>
