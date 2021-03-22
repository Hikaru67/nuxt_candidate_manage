<template>
  <div>
    <CDataTable
      :items="DATA.data"
      :fields="fields[$auth.user.role_id - 1]"
      responsive
      sorter
      class="col-table"
      :no-items-view="{
        noResults: 'no filtering results available',
        noItems: 'no items available',
      }"
      clickable-rows
    >
      <!--  -->

      <!-- work_date-->
      <template #work_date="{ item }">
        <td>
          <CInput
            v-model="item.work_date"
            type="date"
            @change="workDate(item.id)"
          />
        </td>
      </template>

      <!-- linked name -->
      <template #full_name="{ item }" class="full_name">
        <td>
          <span class="full-name">{{
            linkedName(item.first_name, item.last_name)
          }}</span>
        </td>
      </template>

      <!-- convertData interview_date -->
      <template #interview_date="{ item }" class="test">
        <td>
          <span class="">{{ item.interview_date }}</span>
        </td>
      </template>

      <!-- convertData received_date -->
      <template #received_date="{ item }">
        <td>
          <span class="">{{ convertDate(item.received_date) }}</span>
        </td>
      </template>

      <template #cv_link="{ item }">
        <td>
          <span class="test2">{{ item.cv_link }}</span>
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
      <!-- <template #filtered_result="{ item }">
      <td>
        <span class=""> {{ convertFilteredResult(item.filtered_result) }}</span>
      </td>
    </template> -->
      <template #filtered_result="{ item }">
        <td v-if="$auth.user.role_id === 2">
          <input
            id="filtered_result-button"
            type="button"
            class="btn m-2 btn-square"
            :class="color[item.filtered_result]"
            :v-model="item.filtered_result"
            :value="convertFilteredResult(item.filtered_result)"
            @click="transformButtonFilteredResult(item.id)"
          >
        </td>
        <td v-else>
          <span class="">{{
            convertFilteredResult(item.filtered_result)
          }}</span>
        </td>
      </template>

      <!-- convertData interview_result -->
      <!-- <template #interview_result="{ item }">
      <td>
        <span class="">{{
          convertInterviewResult(item.interview_result)
        }}</span>
      </td>
    </template> -->

      <template #interview_result="{ item }">
        <td v-if="item.filtered_result === 1 && $auth.user.role_id === 2">
          <input
            id="interview_result-button"
            type="button"
            class="btn m-2 btn-square"
            :class="color[item.interview_result]"
            :value="convertInterviewResult(item.interview_result)"
            :v-model="item.interview_result"
            @click="transformButtonInterviewResult(item.id)"
          >
        </td>

        <td v-else>
          <span class="">{{
            convertInterviewResult(item.interview_result)
          }}</span>
        </td>
      </template>

      <!-- feedback -->
      <template #feedback="{ item }">
        <td>
          {{ item.feedback }}
        </td>
      </template>

      <template #action="{ item }">
        <td class="row" style="min-width: 150px!important;">
          <CButton v-if="!isInterviewer()" color="primary" variant="ghost" @click="beforeSendEmail(item.id)">
            <CIcon :content="$options.freeSet.cilArrowThickTop" />
          </CButton>
          <CButton color="primary" variant="ghost" @click="editData(item.id)">
            <CIcon :content="$options.freeSet.cilPencil" />
          </CButton>
          <CButton
            v-if="!isInterviewer()"
            color="danger"
            variant="ghost"
            @click="deleteData(item.id)"
          >
            <CIcon :content="$options.freeSet.cilTrash" />
          </CButton>
        </td>
      </template>
    </CDataTable>
    <CModal title="SEND EMAIL" color="primary" :show.sync="test" size="lg" backdrop>
      <SendEmail :list-templates="JSON.parse(JSON.stringify(listTemplates))" :single-profile="singleProfile" @after_send_email="afterSendEmail" />
      <div slot="footer" class="w-100" />
      <div slot="footer-wrapper" />
    </CModal>
    <CPagination
      v-show="DATA.last_page > 1"
      align="end"
      :active-page.sync="DATA.current_page"
      :pages="DATA.last_page"
      @update:activePage="changePage($event)"
    />
  </div>
</template>

<script>
import { freeSet } from '@coreui/icons'
import axios from 'axios'
import SendEmail from '~/components/email/template/SendEmail'
import { apiGetEmailTemplates } from '~/api/apiEmail'

import { URL_CANDIDATE_PROFILES, URL_RESOURCES, URL_POSITIONS } from '~/common/constant/url'

export default {
  name: 'ListTemplate',
  components: { SendEmail },
  // eslint-disable-next-line vue/require-prop-types,vue/prop-name-casing
  props: ['DATA'],

  freeSet,

  data () {
    return {
      listTemplates: {
        default: []
      },
      listProfiles: [],

      singleProfile: {},

      fields: [
        [
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'full_name',
            label: 'Full Name'
          },
          {
            key: 'position_id',
            label: 'Position'
          },
          {
            key: 'source_id',
            label: 'Source'
          },
          'cv_link',
          'received_date',
          'filtered_result',
          'interview_date',
          'feedback',
          'interview_result',
          'work_date',
          {
            key: 'action',
            label: ''
          }
        ],
        [
          {
            key: 'id',
            label: 'ID'
          },
          {
            key: 'full_name',
            label: 'Full Name'
          },
          {
            key: 'position_id',
            label: 'Position'
          },
          {
            key: 'source_id',
            label: 'Source'
          },
          'cv_link',
          'received_date',
          'filtered_result',
          'interview_date',
          'feedback',
          'interview_result',
          {
            key: 'action',
            label: ''
          }
        ]
      ],

      color: [
        'btn-secondary',
        'btn-success',
        'btn-danger',
        'btn-warning',
        'btn-danger',
        'btn-success'
      ],

      positions: [],

      sources: [],

      test: 0,

      filtered_results: [
        { value: 0, text: 'New' },
        { value: 1, text: 'Pass' },
        { value: 2, text: 'Fail' }
      ],

      interview_results: [
        { value: 0, text: '' },
        { value: 2, text: 'Fail' },
        { value: 1, text: 'Pass' },
        { value: 3, text: 'Sent Mail Interview' },
        { value: 4, text: 'Sent Mail Thanks' },
        { value: 5, text: 'Sent Mail Work' }
      ],

      classObject: {}
    }
  },
  mounted () {
    this.DATA.received_date = this.convertDate(this.DATA.received_date)

    // get data to position
    axios.get(URL_POSITIONS).then((response) => {
      this.positions = response.data
    })

    // get data to source
    axios.get(URL_RESOURCES).then((response) => {
      this.sources = response.data
    })
  },

  async created () {
    this.listTemplates = await apiGetEmailTemplates(this.$axios)
    this.listTemplates = JSON.parse(JSON.stringify(this.listTemplates))
  },

  methods: {
    /**
     * `isInterviewer` will check role is interviewer
     *  @return boolean
     */
    isInterviewer () {
      return (this.$auth.user.role_id === 2)
    },

    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate (date) {
      return (date) ? new Date(date * 1000).toLocaleDateString('zh-Hans-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll('/', '-') : ''
    },

    /**
     * `linkedName` will linked firstName and lastName
     * @param firstName String
     * @param lastName String
     * @return String
     */
    linkedName (firstName, lastName) {
      return firstName + ' ' + lastName
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
      axios
        .delete(URL_CANDIDATE_PROFILES + '/' + id)
        .then((res) => {
          alert('Delete data success')
          this.$emit('update_data')
        })
        .catch(function (error) {
          alert(error)
        })
    },

    /**
     * `transformButtonFilteredResult` update status of FilteredResult
     * @param idProfile String
     * @param idProfile String
     */
    transformButtonFilteredResult (idProfile) {
      const dataProfile = this.DATA.data.find(e => e.id === idProfile)

      if (dataProfile.filtered_result === 2) {
        dataProfile.interview_result = 0
      }
      dataProfile.filtered_result++
      if (dataProfile.filtered_result > 2) {
        dataProfile.filtered_result = 1
      }

      axios
        .put(URL_CANDIDATE_PROFILES + '/' + idProfile, dataProfile)
        .catch(function (error) {
          console.log(error)
        })
    },

    /**
     * `transformButtonInterviewResult` update status of InterviewResult
     * @param idProfile Int
     */
    transformButtonInterviewResult (idProfile) {
      const dataProfile = this.DATA.data.find(e => e.id === idProfile)

      // dataProfile.interview_result++;
      if (dataProfile.interview_result < 3) {
        if (dataProfile.interview_result === 2) { dataProfile.interview_result = 1 } else if (dataProfile.interview_result === 1) { dataProfile.interview_result = 2 } else { dataProfile.interview_result++ }

        axios
          .put(URL_CANDIDATE_PROFILES + '/' + idProfile, dataProfile)
          .catch(function (error) {
            console.log(error)
          })
      }
    },

    workDate (idProfile) {
      const dataProfile = this.DATA.data.find(e => e.id === idProfile)

      axios
        .put(URL_CANDIDATE_PROFILES + '/' + idProfile, {
          work_date: dataProfile.work_date
        })
        .catch(function (error) {
          console.log(error)
        })
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
     * changePage will an event changePage
     * @param page String
     *  @return boolean
     */
    changePage (page) {
      this.$emit('change_page', page)
    },

    beforeSendEmail (profileId) {
      this.test = 1
      this.getData(profileId)
    },

    async afterSendEmail () {
      this.test = 0
      await this.$emit('update_data')
    },

    /**
     * `getData` will get data by id
     */
    getData (profileId) {
      this.data = axios
        .get(URL_CANDIDATE_PROFILES + '/' + profileId)
        .then((res) => {
          this.singleProfile = res.data
        })
    }
  }
}
</script>

<style  scoped>
.test {
  max-width: 5000px;
}
.test2 {
  max-width: 80px !important;
  display: inline-block !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
