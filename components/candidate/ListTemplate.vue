<template>
  <CCard>
    <CCardHeader class="center">
      <h3>List Profile</h3>
    </CCardHeader>

    <CCardBody v-if="$auth.user.role_id === 1">
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
            <span class="">{{ convertDate(item.interview_date) }}</span>
          </td>
        </template>

        <!-- convertData received_date -->
        <template #received_date="{ item }">
          <td>
            <span class="">{{ convertDate(item.received_date) }}</span>
          </td>
        </template>

        <!-- convertData created_at -->
        <template #created_at="{ item }">
          <td>
            <span class="">{{ convertDate(item.created_at) }}</span>
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
            <span class="">{{ convertDate(item.updated_at) }}</span>
          </td>
        </template>

        <!-- convertData position_id -->
        <template #position_id="{ item }">
          <td>
            <span class="">{{ convertPosition(item.position_id) }}</span>
          </td>
        </template>

        <!-- convertData source_id -->
        <template #source_id="{ item }">
          <td>
            <span class=""> {{ convertSource(item.source_id) }}</span>
          </td>
        </template>

        <!-- convertData filtered_result -->
        <template #filtered_result="{ item }">
          <td>
            <span class="">
              {{ convertFilteredResult(item.filtered_result) }}</span>
          </td>
        </template>

        <!-- convertData interview_result -->
        <template #interview_result="{ item }">
          <td>
            <span class="">{{
              convertInterviewResult(item.interview_result)
            }}</span>
          </td>
        </template>

        {{ $route.fullPath }}

        <template #action="{ item }">
          <td class="row">
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

    <CCardBody v-else-if="$auth.user.role_id === 2">
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
            <span class="">{{ convertDate(item.interview_date) }}</span>
          </td>
        </template>

        <!-- convertData received_date -->
        <template #received_date="{ item }">
          <td>
            <span class="">{{ convertDate(item.received_date) }}</span>
          </td>
        </template>

        <!-- convertData created_at -->
        <template #created_at="{ item }">
          <td>
            <span class="">{{ convertDate(item.created_at) }}</span>
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
            <span class="">{{ convertDate(item.updated_at) }}</span>
          </td>
        </template>

        <!-- convertData position_id -->
        <template #position_id="{ item }">
          <td>
            <span class="">{{ convertPosition(item.position_id) }}</span>
          </td>
        </template>

        <!-- convertData source_id -->
        <template #source_id="{ item }">
          <td>
            <span class=""> {{ convertSource(item.source_id) }}</span>
          </td>
        </template>

        <!-- convertData filtered_result -->
        <template #filtered_result="{ item }">
          <td>
            <input
              id="filtered_result-button"
              type="button"
              :class="
                (item.filtered_result === 2 &&
                  'btn m-2 btn-danger btn-square') ||
                  (item.filtered_result === 1 &&
                    'btn m-2 btn-success btn-square') ||
                  (item.filtered_result === 3 && 'btn m-2 btn-warning btn-square')
              "
              :value="convertFilteredResult(item.filtered_result)"
              @click="
                transformButtonFilteredResult(item.id, item.filtered_result)
              "
            >
          </td>
        </template>

        <!-- convertData interview_result -->
        <template #interview_result="{ item }">
          <td>
            <input
              id="interview_result-button"
              type="button"
              :class="
                (item.interview_result === 2 &&
                  'btn m-2 btn-danger btn-square') ||
                  (item.interview_result === 1 &&
                    'btn m-2 btn-success btn-square') ||
                  (item.interview_result === 3 &&
                    'btn m-2 btn-warning btn-square')
              "
              :value="convertInterviewResult(item.interview_result)"
              @click="
                transformButtonInterviewResult(item.id, item.interview_result)
              "
            >
          </td>
        </template>

        {{ $route.Path }}

        <template #action="{ item }">
          <td class="row">
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
        {
          key: 'id',
          label: 'ID'
        },
        {
          key: 'first_name',
          label: 'First Name'
        },
        {
          key: 'last_name',
          label: 'Last Name'
        },
        {
          key: 'position_id',
          label: 'Position'
        },
        {
          key: 'source_id',
          label: 'Source'
        },
        'received_date',
        'filtered_result',
        'interview_date',
        'feedback',
        'interview_result',
        'cv_link',
        'note',
        {
          key: 'action',
          label: ''
        }
      ],
      items: [],
      positions: [],
      sources: [],
      filtered_results: [
        { value: 3, text: 'Pending' },
        { value: 1, text: 'Pass' },
        { value: 2, text: 'Fail' }
      ],
      interview_results: [
        { value: 3, text: 'Pending' },
        { value: 2, text: 'Fail' },
        { value: 1, text: 'Pass' }
      ]
    }
  },
  mounted () {
    /**
     * get data to items
     */
    axios.get(urlCandidatesProfiles).then((response) => {
      this.items = response.data
    })
    /**
     * get data to position
     */
    axios.get(urlPositions).then((response) => {
      this.positions = response.data
    })
    /**
     * get data to source
     */
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
      const temp = result ? result.text : ''
      return temp
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
      window.location.href = './' + id
    },
    /**
     * `deleteData` will delete data by id
     * @param id String
     */
    deleteData (id) {
      // eslint-disable-next-line no-console
      console.log(id)
      axios
        .delete(this.urlCandidatesProfiles + '/' + id)
        .then((res) => {
          alert('Delete data success')
          window.location.href = './'
        })
        .catch(function (error) {
          alert(error)
        })
    },
    /**
     * `transformButtonFilteredResult` update status of FilteredResult
     * @param id String
     * @param idComponent String
     */
    transformButtonFilteredResult (idComponent, id) {
      const buttonComponent = document.querySelector('#filtered_result-button')
      // id increase
      id += 1
      if (id > 3) {
        id = 1
      }
      // find item update
      const item = this.items.find(e => e.id === idComponent)
      if (item) {
        item.filtered_result = id
      }
      // update item
      axios
        .put(urlCandidatesProfiles + '/' + idComponent, item)
        .then((res) => {})
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        })
      // convert class button
      if (buttonComponent) {
        this.convertClassButton(buttonComponent, buttonComponent.value)
      } else { return '' }
    },
    /**
     * `transformButtonInterviewResult` update status of InterviewResult
     * @param id String
     * @param idComponent String
     */
    transformButtonInterviewResult (idComponent, id) {
      const buttonComponent = document.querySelector('#interview_result-button')
      // id increase
      id += 1
      if (id > 3) {
        id = 1
      }
      // find item update
      const item = this.items.find(e => e.id === idComponent)
      if (item) {
        item.interview_result = id
      }
      // update item
      axios
        .put(urlCandidatesProfiles + '/' + idComponent, item)
        .then((res) => {})
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.log(error)
        })
      // convert class button
      if (buttonComponent) {
        this.convertClassButton(buttonComponent, buttonComponent.value)
      } else { return '' }
    },
    /**
     * `transformButtonInterviewResult` update status of InterviewResult
     * @param Component Object
     * @param value String
     */
    convertClassButton (Component, value) {
      if (value === 'Pending') {
        Component.classList.add('btn', 'm-2', 'btn-warning', 'btn-square')
      } else if (value === 'Pass') {
        Component.classList.add('btn', 'm-2', 'btn-success', 'btn-square')
      } else if (value === 'Fail') {
        Component.classList.add('btn', 'm-2', 'btn-danger', 'btn-square')
      } else { return '' }
    }
  }
}
</script>

<style  scoped>
.test {
  max-width: 5000px;
}
.test2 {
  max-width: 20px !important;
  display: inline-block !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
