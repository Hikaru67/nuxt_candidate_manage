<template>
  <div>
    <CCard>
      <CCardHeader class="center">
        <h3 v-if="$route.params.id">
          Edit Candidate Profile
        </h3>
        <h3 v-else>
          Create Candidate Profile
        </h3>
      </CCardHeader>

      <CCardBody>
        <div v-if="errors.length">
          <CAlert v-for="error in errors" :key="error" color="danger">
            {{ error }}
          </CAlert>
        </div>

        <!-- first_name -->
        <CRow>
          <CCol sm="10">
            <CInput
              v-model="data.first_name"
              label="First Name"
              placeholder="Enter first name "
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!-- last_name -->
        <CRow>
          <CCol sm="10">
            <CInput
              v-model="data.last_name"
              label="Last Name"
              placeholder="Enter last name "
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!-- email -->
        <CRow>
          <CCol sm="10">
            <CInput
              v-model="data.email"
              label="Email"
              placeholder="Enter email "
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!-- phone -->
        <CRow>
          <CCol sm="10">
            <CInput
              v-model="data.phone"
              label="Phone"
              placeholder="Enter phone"
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!-- position_id -->
        <CRow>
          <CCol sm="2">
            <label for="position">Position:</label>
          </CCol>

          <CCol sm="4">
            <select id="position" v-model="data.position_id" class="form-control">
              <option
                v-for="(item, index) in positions"
                :key="index"
                :value="item.id"
                :disabled="isInterviewer"
              >
                {{ item.name }}
              </option>
            </select>
          </CCol>
        </CRow>

        <!-- source_id -->
        <CRow>
          <CCol sm="2">
            <label for="source">Source:</label>
          </CCol>

          <CCol sm="4">
            <select id="source" v-model="data.source_id" class="form-control">
              <option
                v-for="(item, index) in sources"
                :key="index"
                :value="item.id"
                :disabled="isInterviewer"
              >
                {{ item.name }}
              </option>
            </select>
          </CCol>
        </CRow>

        <!-- received_date -->
        <CRow>
          <CCol sm="10">
            <CInput
              v-model="data.received_date"
              label="Received Date"
              type="date"
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!--      <CRow>
          <CCol sm="2">
            <label for="received_date">Received Date</label>
          </CCol>

          <CCol sm="4">
            <input
              id="received_date"
              v-model="data.received_date"
              class="form-control"
              type="date"
            >
          </CCol>
        </CRow>-->

        <!-- filtered_result -->
        <CRow>
          <CCol v-if="data.filtered_result === 1" sm="10">
            <CInput
              v-model="data.interview_date"
              label="Interview Date"
              type="date"
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!--      <CRow>
          <CCol v-if="data.filtered_result===1" sm="2">
            <label for="interview_date">Interview Date:</label>
          </CCol>

          <CCol v-if="data.filtered_result===1" sm="4">
            <input
              id="interview_date"
              v-model="data.interview_date"
              class="form-control"
              type="date"
            >
          </CCol>
        </CRow>-->

        <!-- feedback -->
        <CRow>
          <CCol sm="10">
            <CTextarea
              v-model="data.feedback"
              label="Feedback"
              placeholder="Enter feedback"
              horizontal
            />
          </CCol>
        </CRow>
        <!-- interview_result -->
        <!--       <CRow>
          <CCol sm="2">
            <label id="label-center" for="interview_result">Interview Result:</label>
          </CCol>

          <CCol sm="4">
            <select
              id="source"
              class="form-control"
              v-model="data.interview_result"
              horizontal
            >
              <option
                v-for="(item, index) in interview_results"
                :key="index"
                :value="item.value"
              >
                {{ item.text }}
              </option>
            </select>
          </CCol>
        </CRow> -->

        <!-- cv_link -->
        <CRow>
          <CCol sm="10">
            <CTextarea
              v-model="data.cv_link"
              label="CV Link"
              placeholder="Enter link my cv"
              :disabled="isInterviewer"
              horizontal
            />
          </CCol>
        </CRow>

        <!-- note -->
        <!-- <CRow>
          <CCol sm="10">
            <CTextarea
              v-model="data.note"
              label="Note"
              placeholder="Enter note"
              horizontal
            />
          </CCol>
        </CRow> -->
      </CCardBody>

      <!-- button -->
      <CCardFooter>
        <div class="center">
          <CButton v-if="this.id" color="success" @click="updateData">
            Update
          </CButton>
          <CButton v-else color="success" @click="addData">
            Create
          </CButton>
          <a href="./">
            <CButton color="primary"> Return </CButton>
          </a>
        </div>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
import axios from 'axios'

import {
  URL_CANDIDATE_PROFILES,
  URL_RESOURCES,
  URL_POSITIONS
} from '../../common/constant/url'

import {
  FILTERED_RESULTS,
  INTERVIEW_RESULTS
} from '~/common/constant/nature'

export default {
  data () {
    return {
      id: '',
      errors: [],
      positions: [],
      sources: [],

      data: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        position_id: 0,
        source_id: 0,
        received_date: '',
        filtered_result: 0,
        interview_date: '',
        feedback: '',
        interview_result: 0,
        cv_link: '',
        note: 'NULL',
        created_at: ''
      },

      filtered_results: FILTERED_RESULTS,

      interview_results: INTERVIEW_RESULTS
    }
  },

  computed: {

    /**
     * `isInterviewer` will check role is interviewer
     *  @return boolean
     */
    isInterviewer () {
      if (this.$auth.user.role_id === 2) {
        return true
      }
      return false
    }
  },

  mounted () {
    // call func getData if id is valid
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getData()
    }

    // get data to position
    axios.get(URL_POSITIONS).then((response) => {
      this.positions = response.data
    })

    // get data to source
    axios.get(URL_RESOURCES).then((response) => {
      this.sources = response.data
    })
  },

  methods: {
    /**
     * `getData` will get data by id
     */
    getData () {
      this.data = axios
        .get(URL_CANDIDATE_PROFILES + '/' + this.id)
        .then((res) => {
          this.data = res.data
          this.data.received_date = this.convertDate(this.data.received_date)
        })
    },

    /**
     * `addData` add a new data to database
     */
    addData () {
      if (this.validate()) {
        this.data.received_date = this.toUnixTime(this.data.received_date)
        axios
          .post(URL_CANDIDATE_PROFILES, this.data)
          .then(() => {
            alert('Add data success')
            window.location.href = './'
          })
          .catch(function (error) {
            alert(error)
          })
      }
      window.scrollTo(0, 0)
    },

    /**
     * `updateData` update current data by id
     */
    updateData () {
      if (!this.isInterviewer) {
        if (this.validate()) {
          this.data.received_date = this.toUnixTime(this.data.received_date)
          axios
            .put(URL_CANDIDATE_PROFILES + '/' + this.id, this.data)
            .then(() => {
              alert('Update data success')
              window.location.href = './'
            })
            .catch(function (error) {
              alert(error)
            })
        }
      } else {
        axios
          .put(URL_CANDIDATE_PROFILES + '/' + this.id, {
            feedback: this.data.feedback
          })
          .then(() => {
            alert('Update data success')
            window.location.href = './'
          })
          .catch(function (error) {
            alert(error)
          })
      }

      window.scrollTo(0, 0)
    },

    /**
     * `validate` update current data by id
     */
    validate () {
      this.errors = []

      if (!this.data.first_name) {
        this.errors.push('First Name required.')
      }

      if (!this.data.last_name) {
        this.errors.push('Last Name required.')
      }

      if (!this.data.email) {
        this.errors.push('Email required.')
      }

      if (!this.data.phone) {
        this.errors.push('Phone required.')
      }

      if (!this.data.position_id) {
        this.errors.push('Position required.')
      }

      if (!this.data.source_id) {
        this.errors.push('Source required.')
      }

      if (!this.data.received_date) {
        this.errors.push('Received Date required.')
      }

      return !this.errors.length
    },

    /**
     * `toUnixTime` will convert time to unixTime
     * @param time String
     * @return String
     */
    toUnixTime (time) {
      return time ? new Date(time).getTime() / 1000 : ''
    },

    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate (date) {
      return date
        ? new Date(date * 1000)
          .toLocaleDateString('zh-Hans-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          .replaceAll('/', '-')
        : ''
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}

#position {
  width: 150px;
  margin-left: 12%;
  margin-bottom: 5%;
}

#source {
  width: 150px;
  margin-left: 12%;
  margin-bottom: 5%;
}

#label-center {
  margin-top: 4%;
}
</style>
