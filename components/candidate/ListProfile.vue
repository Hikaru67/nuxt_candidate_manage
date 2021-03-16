<template>
  <CCard>
    <CCardHeader class="center">
      <h3>List Profile Templates</h3>
    </CCardHeader>

    <CCardBody>
      <CDataTable
        :items="items"
        :fields="fields"
        items-per-page-select
        pagination
        responsive
        sorter
        class="col-table"
        table-filter
        :no-items-view="{
          noResults: 'no filtering results available',
          noItems: 'no items available',
        }"
        clickable-rows
      >
        <!-- convertData interview_date -->
        <template #interview_date="{ item }" class="test">
          <td>
            <span class="test2">{{ convertDate(item.interview_date) }}</span>
          </td>
        </template>

        <!-- convertData received_date -->
        <template #received_date="{ item }">
          <td>
            <span class="test2">{{ convertDate(item.received_date) }}</span>
          </td>
        </template>

        <!-- convertData created_at -->
        <template #created_at="{ item }">
          <td>
            <span class="test2">{{ convertDate(item.created_at) }}</span>
          </td>
        </template>

        <template #cv_link="{ item }">
          <td>
            <span class="test2">{{ item.cv_link }}</span>
          </td>
        </template>

        <!-- convertData updated_at -->
        <template #updated_at="{ item }">
          <td>
            <span class="test2">{{ convertDate(item.updated_at) }}</span>
          </td>
        </template>

        <!-- convertData position_id -->
        <template #position_id="{ item }">
          <td>
            <span class="test2">{{ convertPosition(item.position_id) }}</span>
          </td>
        </template>

        <!-- convertData source_id -->
        <template #source_id="{ item }">
          <td>
            <span class="test2"> {{ convertSource(item.source_id) }}</span>
          </td>
        </template>

        <!-- convertData filtered_result -->
        <template #filtered_result="{ item }">
          <td>
            <span class="test2"> {{ convertFilteredResult(item.filtered_result) }}</span>
          </td>
        </template>

        <!-- convertData interview_result -->
        <template #interview_result="{ item }">
          <td>
            <span class="test2">{{ convertInterviewResult(item.interview_result) }}</span>
          </td>
        </template>

        {{ $route.fullPath }}

        <template #action="{ item }">
          <td>
            <CButton color="secondary" variant="ghost">
              <CIcon :content="$options.freeSet.cilPencil" />
            </CButton>
            <CButton color="primary" variant="ghost" @click="editData(item.id)">
              <CIcon :content="$options.freeSet.cilPencil" />
            </CButton>
            <CButton
              color="danger"
              variant="ghost"
              @click="deleteData(item.id)"
            >
              <CIcon :content="$options.freeSet.cilTrash" />
            </CButton>
          </td>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import { freeSet } from '@coreui/icons'
import axios from 'axios'

const urlSources = 'http://candidate-manage.herokuapp.com/api/sources'
const urlPositions = 'http://candidate-manage.herokuapp.com/api/positions'
const urlCandidatesProfiles =
  'http://candidate-manage.herokuapp.com/api/candidates-profiles'

export default {
  name: 'ListTemplate',
  freeSet,
  data () {
    return {
      fields: [
        'id',
        'first_name',
        'last_name',
        'position_id',
        'source_id',
        'received_date',
        'filtered_result',
        'interview_date',
        'feedback',
        'interview_result',
        'cv_link',
        'note',
        'created_at',
        {
          key: 'action',
          label: ''
        }
      ],
      items: [],
      positions: [],
      sources: [],
      filtered_results: [
        { value: 0, text: 'Pending' },
        { value: 1, text: 'Pass' }
      ],
      interview_results: [
        { value: 0, text: 'Pending' },
        { value: 1, text: 'Pass' }
      ]
    }
  },

  mounted () {
    //   get data to items
    axios.get(urlCandidatesProfiles).then((response) => {
      this.items = response.data
    })

    //   get data to position
    axios.get(urlPositions).then((response) => {
      this.positions = response.data
    })

    //   get data to position
    axios.get(urlSources).then((response) => {
      this.sources = response.data
    })
  },

  methods: {
    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate (date) {
      date = new Date(date)
      return date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()
    },

    /**
     * `convertPosition` will convert from position id to position name
     * @param id Integer
     */
    convertPosition (id) {
      const result = this.positions.find((item) => {
        return item.id === id
      })
      return result ? result.name : ''
    },

    /**
     * `convertSource` will convert from source id to source name
     * @param id Integer
     */
    convertSource (id) {
      const result = this.sources.find((item) => {
        return item.id === id
      })
      return result ? result.name : ''
    },

    /**
     * `convertFilteredResult` will convert from value to text of FilteredResult
     * @param value Integer
     */
    convertFilteredResult (value) {
      const result = this.filtered_results.find((item) => {
        return item.value === value
      })
      return result ? result.text : ''
    },

    /**
     * `convertInterviewResult` will convert from value to text of InterviewResult
     * @param value Integer
     */
    convertInterviewResult (value) {
      const result = this.interview_results.find((item) => {
        return item.value === value
      })
      return result ? result.text : ''
    },

    /**
     * `editData` will redirect to edit data page
     * @param id String
     */
    editData (id) {
      window.location.href = './profiles/' + id
    },

    /**
     * `deleteData` will delete data by id
     * @param id String
     */
    deleteData (id) {
      axios
        .delete(this.url + id)
        .then((res) => {
          alert('Delete data success')
          window.location.href = './'
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>

<style  scoped>

.test{
    max-width: 5000px;
}

.test2{
    max-width: 70px !important;
    display: inline-block !important;
    overflow: hidden;
    text-overflow: ellipsis ;
    white-space: nowrap;
}
</style>
