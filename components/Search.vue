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
        <CCol sm="6">
          <CInput
            v-model="searchForm.firstName"
            label="Name"
            placeholder="Enter first name"
            horizontal
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="searchForm.lastName"
            label="Name"
            placeholder="Enter last name"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CSelect
            :data-sync="searchForm.position"
            :options="positions"
            label="Position"
            horizontal
          />
        </CCol>
        <CCol sm="6">
          <CSelect
            :data-sync="searchForm.source"
            :options="sources"
            label="Source"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CInput
            v-model="receivedDate.from"
            label="From date"
            type="date"
            horizontal
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="receivedDate.to"
            label="To date"
            type="date"
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
import { apiGetPositions, apiGetSource } from '~/api/baseData'

export default {
  name: 'Search',
  data () {
    return {
      positions: [],
      sources: [],
      receivedDate: {
        from: '',
        to: ''
      },
      searchForm: {
        firstName: '',
        lastName: '',
        position: '',
        source: '',
        receivedDateFrom: '',
        receivedDateTo: ''
      }
    }
  },
  async mounted () {
    this.positions = await apiGetPositions(this.$axios)
    this.positions = this.positions.map((item) => { return { value: item.id, label: item.name } })
    this.sources = await apiGetSource(this.$axios)
    this.sources = this.sources.map((item) => { return { value: item.id, label: item.name } })
  },
  methods: {
    search () {
      this.searchForm.receivedDateFrom = this.convertToUnixTime(this.receivedDate.from)
      this.searchForm.receivedDateTo = this.convertToUnixTime(this.receivedDate.to)
      this.$emit('search', this.searchForm)
    },
    convertToUnixTime (time) {
      return (time) ? new Date(time).getTime() / 1000 : ''
    }
  }
}
</script>

<style scoped>

</style>
