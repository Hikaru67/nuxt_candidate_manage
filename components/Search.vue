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
            v-model="searchForm.name"
            label="Name"
            placeholder="Enter name"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CSelect
            :data-sync="searchForm.position"
            :options="positions"
            label="Positions"
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
            v-model="searchForm.receiverDateFrom"
            label="From date"
            type="date"
            horizontal
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="searchForm.receiverDateTo"
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
      searchForm: {
        name: '',
        position: '',
        source: '',
        receiverDateFrom: '',
        receiverDateTo: ''
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
      this.$emit('search', this.searchForm)
    }
  }
}
</script>

<style scoped>

</style>
