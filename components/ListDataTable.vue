<template>
  <CDataTable
    :items="items"
    :fields="fields"
    items-per-page-select
    pagination
    responsive
    sorter
    table-filter
    :no-items-view="{ noResults: 'no filtering results available', noItems: 'no items available' }"
    clickable-rows
  >
    <template #created_at="{ item }">
      <td style="max-width: 60px">
        {{ convertDate(item.created_at) }}
      </td>
    </template>

    <template #position_id="{ item }">
      <td style="max-width: 60px">
        {{ getPosition(item.position_id) }}
      </td>
    </template>

    <template #source_id="{ item }">
      <td style="max-width: 60px">
        {{ getSource(item.source_id) }}
      </td>
    </template>

    <template #filtered_result="{ item }">
      <td class="btn btn-outline-info" @click="updateResult(item.id, item.filtered_result)">
        {{ results[item.filtered_result] }}
      </td>
    </template>

    <template #interview_result="{ item }">
      <td style="max-width: 60px">
        {{ results[item.interview_result] }}
      </td>
    </template>

    {{ $route.fullPath }}
    <template #action="{ item }">
      <td style="max-width: 90px">
        <!--        <CButton color="secondary" variant="ghost">
          <CIcon :content="$options.freeSet.cilNotes" />
        </CButton>-->
        <CButton color="primary" variant="ghost" @click="editData(item.id)">
          <CIcon :content="$options.freeSet.cilPencil" />
        </CButton>
        <CButton color="danger" variant="ghost" @click="deleteData(item.id)">
          <CIcon :content="$options.freeSet.cilTrash" />
        </CButton>
      </td>
    </template>
  </CDataTable>
</template>

<script>
import { freeSet } from '@coreui/icons'
import axios from 'axios'

export default {
  name: 'ListDataTable',
  freeSet,
  props: {
    // eslint-disable-next-line vue/require-default-prop
    fields: Array,
    // eslint-disable-next-line vue/require-default-prop
    url: String
  },
  data () {
    return {
      items: [],
      positions: [],
      sources: [],
      results: ['Pending', 'Pass', 'Fail']
    }
  },
  created () {
    axios.get(this.url)
      .then((response) => {
        this.items = response.data
      })

    axios.get(this.$store.state.url.API_POSITIONS_URL)
      .then((response) => {
        this.positions = response.data
      })

    axios.get('http://127.0.0.1:8000/api/sources')
      .then((response) => {
        this.sources = response.data
        console.log(response.data)
      })
  },
  methods: {
    /**
     * `getPosition` will get position Name
     * @param positionId number
     * @return string
     */
    getPosition (positionId) {
      return this.positions.find(item => item.id === positionId).name
    },

    /**
     * `getSource` will get source Name
     * @param sourceId number
     * @return string
     */
    getSource (sourceId) {
      if (!this.sources) {
        axios.get('http://127.0.0.1:8000/api/sources')
          .then((response) => {
            this.sources = response.data
            console.log(response.data)
          })
      }
      try {
        return this.sources.find(item => item.id === sourceId).name
      } catch (e) {
        alert(e)
      }
      // if (this.sources.find(item => item.id === sourceId).name) { return this.sources.find(item => item.id === sourceId).name }
    },

    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate (date) {
      return new Date(date).toLocaleDateString()
    },

    /**
     * `editData` will redirect to edit data page
     * @param id String
     */
    editData (id) {
      this.$router.push(this.$route.path + '/' + id)
    },

    /**
     * `deleteData` will delete data by id
     * @param id String
     */
    deleteData (id) {
      axios.delete(this.url + '/' + id)
        .then((res) => {
          alert('Delete data success')
          window.location.href = './'
        })
        .catch(function (error) {
          alert(error)
        })
    },
    updateResult (id, filteredId) {
      filteredId++
      if (filteredId > 2) { filteredId = 0 }
      axios.put(this.$store.state.url.API_CANDIDATE_PROFILES_URL + '/' + id, { id, filtered_result: filteredId })
        .then((res) => {
          this.items.find(item => item.id === id).filtered_result = filteredId
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
