<template>
  <CCard>
    <CCardHeader class="center">
      <h3 v-if="id">
        Edit Profile Template
      </h3>
      <h3 v-else>
        Create Profile Template
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
            horizontal
          />
        </CCol>
      </CRow>

      <!-- position_id -->
      <CRow>
        <CCol sm="10">
          <CSelect
            label="Position"
            :options="positions"
            horizontal
            :value.sync="data.position_id"
          />
        </CCol>
      </CRow>

      <!-- source_id -->
      <CRow>
        <CCol sm="10">
          <CSelect
            :value.sync="data.source_id"
            :options="sources"
            label="Source"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- received_date -->
      <!-- date -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.received_date"
            label="Received Date"
            type="date"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- interview_date -->
      <!-- date -->
      <CRow v-if="data.interview_date">
        <CCol sm="10">
          <CInput
            v-model="data.interview_date"
            type="date"
            label="Interview Date"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- feedback -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.feedback"
            label="Feedback"
            placeholder="Enter feedback"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- cv_link -->
      <CRow>
        <CCol sm="10">
          <CTextarea
            v-model="data.cv_link"
            label="CV Link"
            placeholder="Enter link my cv"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- note -->
      <CRow>
        <CCol sm="10">
          <CTextarea
            v-model="data.note"
            label="Note"
            placeholder="Enter note"
            horizontal
          />
        </CCol>
      </CRow>
    </CCardBody>

    <CCardFooter>
      <div class="center">
        <CButton v-if="id" color="success" @click="updateData">
          Update
        </CButton>
        <CButton v-else color="success" @click="addData">
          Create
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import axios from 'axios'
import { apiGetPositions, apiGetSource } from '@/api/baseData'

const urlRoles = 'https://candidate-manage.herokuapp.com/api/roles'
const urlEmailTemplates =
  'http://candidate-manage.herokuapp.com/api/email-templates'
const urlSources = 'http://candidate-manage.herokuapp.com/api/sources'
const urlPositions = 'http://candidate-manage.herokuapp.com/api/positions'
const urlCandidatesProfiles =
  'http://candidate-manage.herokuapp.com/api/candidates-profiles'

export default {
  data () {
    return {
      urlRoles,
      urlEmailTemplates,
      urlSources,
      urlPositions,
      urlCandidatesProfiles,

      id: '',
      errors: [],
      positions: [],
      sources: [],
      data: {
        first_name: '',
        last_name: '',
        position_id: '',
        source_id: '',
        received_date: '',
        interview_date: '',
        feedback: '',
        cv_link: '',
        note: ''
      }
    }
  },

  async created () {
    this.positions = await apiGetPositions(this.$axios)
    this.positions = this.positions.map((item) => {
      return { value: item.id, label: item.name }
    })

    this.sources = await apiGetSource(this.$axios)
    this.sources = this.sources.map((item) => {
      return { value: item.id, label: item.name }
    })

    console.log(this.sources)
  },

  /**
   * get param id from url and call method getData
   */
  mounted () {
    this.id = this.$route.params.id
    if (this.id) {
      this.getData()
    }
  },

  methods: {
    /**
     * `getData` will get data by id
     */
    getData () {
      this.data = axios
        .get(this.urlCandidatesProfiles + '/' + this.id)
        // .get(this.urlCandidatesProfiles) // test
        .then((res) => {
          this.data = res.data
        })
    },

    /**
     * `addData` add a new data to database
     */
    addData () {
      if (this.validate()) {
        axios
          .post(this.urlCandidatesProfiles, this.data)
          .then((res) => {
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
      if (this.validate()) {
        axios
          .put(this.urlCandidatesProfiles + '/' + this.id, this.data)
          .then((res) => {
            alert('Update data success')
            window.location.href = './'
          })
          .catch(function (error) {
            alert(error)
          })
      }
      window.scrollTo(0, 0)
    },

    validate () {
      this.errors = []

      if (!this.data.first_name) {
        this.errors.push('First Name required.')
      }

      if (!this.data.last_name) {
        this.errors.push('Last Name required.')
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
    }
  }
}
</script>

<style>
.center {
  text-align: center;
}
</style>
