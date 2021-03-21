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
            v-model="formSearch.firstName"
            label="First name"
            placeholder="Enter first name"
            horizontal
          />
        </CCol>
        <CCol sm="6">
          <CInput
            v-model="formSearch.lastName"
            label="Last name"
            placeholder="Enter last name"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CSelect
            :value.sync="formSearch.position"
            :options="formatOptionsValue(positions)"
            label="Positions"
            horizontal
          />
        </CCol>
        <CCol sm="6">
          <CSelect
            :value.sync="formSearch.source"
            :options="formatOptionsValue(sources)"
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
      {{ formSearch }}
      <br>
      {{ formatOptionsValue(positions) }}
      <div class="center">
        <CButton color="success" @click="search">
          Search
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import { apiGetPositions } from '~/api/baseData'
import { apiGetSource } from '~/api/apiSource'

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
      formSearch: {
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
    this.sources = await apiGetSource(this.$axios)
  },
  methods: {
    /**
     * `search` will change type date to unixTime
     * Then send an event search
     */
    search () {
      this.formSearch.receivedDateFrom = this.toUnixTime(this.receivedDate.from)
      this.formSearch.receivedDateTo = this.toUnixTime(this.receivedDate.to)
      this.$emit('search', this.formSearch)
    },

    /**
     * `toUnixTime` will convert time to unixTime
     * @param time String
     * @return String
     */
    toUnixTime (time) {
      return (time) ? new Date(time).getTime() / 1000 : ''
    },

    /**
     * `formatOptionsValue` will change format item in array
     * @param listValue Array
     * @return Array
     */
    formatOptionsValue (listValue) {
      if (listValue.length) {
        return listValue.map((item) => {
          return { value: item.id, label: item.name }
        })
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
