<template>
  <CCard>
    <CCardHeader class="center">
      <h3 v-if="id">Edit Profile Template</h3>
      <h3 v-else>Create Profile Template</h3>
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
          <CInput
            v-model="data.position_id"
            label="Position"
            placeholder="Enter position "
            horizontal
          />
        </CCol>
      </CRow>

      <!-- source_id -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.source_id"
            label="Source"
            placeholder="Enter Source "
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
            placeholder="Enter received date "
            horizontal
          />
        </CCol>
      </CRow>

      <!-- filtered_result -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.filtered_result"
            label="Filtered Result"
            placeholder="Enter filtered result"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- interview_date -->
      <!-- date -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.interview_date"
            label="First Name"
            placeholder="Enter first name "
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

      <!-- interview_result -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.interview_result"
            label="Interview Result"
            placeholder="Enter interview result"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- cv_link -->
      <CRow>
        <CCol sm="10">
          <CInput
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
          <CInput
            v-model="data.note"
            label="Note"
            placeholder="Enter note"
            horizontal
          />
        </CCol>
      </CRow>

      <!-- created_at -->
      <!-- date -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.created_at"
            label="created_at"
            placeholder="Enter first name "
            horizontal
          />
        </CCol>
      </CRow>

      <!-- updated_at -->
      <!-- date -->
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.updated_at"
            label="First Name"
            placeholder="Enter first name "
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
        <CButton v-else color="success" @click="addData"> Create </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import axios from "axios";

const urlRoles = "https://candidate-manage.herokuapp.com/api/roles";
const urlEmailTemplates =
  "http://candidate-manage.herokuapp.com/api/email-templates";
const urlSources = "http://candidate-manage.herokuapp.com/api/sources";
const urlPositions = "http://candidate-manage.herokuapp.com/api/positions";
const urlCandidatesProfiles =
  "http://candidate-manage.herokuapp.com/api/candidates-profiles";

export default {
  data() {
    return {
      urlRoles,
      urlEmailTemplates,
      urlSources,
      urlPositions,
      urlCandidatesProfiles,

      id: "",
      errors: [],
      data: {
        first_name: "",
        last_name: "",
        position_id: 0,
        source_id: 0,
        received_date: "",
        filtered_result: 0,
        interview_date: "",
        feedback: "",
        interview_result: 0,
        cv_link: "",
        note: "",
        created_at: "",
        updated_at: "",
      },
    };
  },

  /**
   * get param id from url and call method getData
   */
  mounted() {
    this.id = this.$route.params.id;
    if (this.id) {
      this.getData();
    }
  },

  methods: {
    /**
     * `getData` will get data by id
     */
    getData() {
      this.data = axios
        .get(this.urlCandidatesProfiles + '/' + this.id)
        // .get(this.urlCandidatesProfiles) // test
        .then((res) => {
          this.data = res.data;
        });
    },

    /**
     * `addData` add a new data to database
     */
    addData() {
      if (this.validate()) {
        axios
          .post(this.urlCandidatesProfiles, this.data)
          .then((res) => {
            alert("Add data success");
            window.location.href = "./";
          })
          .catch(function (error) {
            alert(error);
          });
      }
      window.scrollTo(0, 0);
    },

    /**
     * `updateData` update current data by id
     */
    updateData() {
      if (this.validate()) {
        axios
          .put(this.urlCandidatesProfiles + '/' + this.id, this.data)
          .then((res) => {
            alert("Update data success");
            window.location.href = "./";
          })
          .catch(function (error) {
            alert(error);
          });
      }
      window.scrollTo(0, 0);
    },

    validate() {
      this.errors = [];

      if (!this.data.first_name) {
        this.errors.push("First Name required.");
      }

      if (!this.data.last_name) {
        this.errors.push("Last Name required.");
      }

      if (!this.data.position_id) {
        this.errors.push("Position required.");
      }

      if (!this.data.source_id) {
        this.errors.push("Source required.");
      }

      if (!this.data.received_date) {
        this.errors.push("Received Date required.");
      }

      if (!this.data.filtered_result) {
        this.errors.push("Filtered Result required.");
      }

      if (!this.data.interview_date) {
        this.errors.push("Interview Date required.");
      }

      if (!this.data.interview_result) {
        this.errors.push("Interview Result required.");
      }

      if (!this.data.created_at) {
        this.errors.push("Created At required.");
      }

      if (!this.data.updated_at) {
        this.errors.push("Updated At required.");
      }

      return !this.errors.length;
    },
  },
};
</script>

<style>
.center {
  text-align: center;
}
</style>
