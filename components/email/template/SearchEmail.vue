<template>
  <CCard>
    <CCardHeader class="center">
      <h4>
        Search Form
      </h4>
    </CCardHeader>
    <CCardBody>
      <br>
      <CRow>
        <CCol sm="8">
          <CInput
            v-model="formSearch.name"
            label="Name"
            placeholder="Enter name email"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="8">
          <CInput
            v-model="formSearch.title"
            label="Title"
            placeholder="Title email"
            horizontal
          />
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <div class="center">
        <CButton color="success" @click="search">
          Search
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>

export default {
  name: 'SearchEmail',
  data () {
    return {
      formSearch: {
        name: '',
        title: ''
      }
    }
  },
  methods: {
    /**
     * `search` will change type date to unixTime
     * Then send an event search
     */
    search () {
      this.$emit('search', this.formSearch)
    },

    /**
     * `toUnixTime` will convert time to unixTime
     * @param time String
     * @return String
     */
    toUnixTime (time) {
      return (time) ? new Date(time).getTime() / 1000 : ''
    }
  }
}
</script>

<style scoped>

</style>
