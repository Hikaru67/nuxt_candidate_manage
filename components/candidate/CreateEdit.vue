<template>
  <div>
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

      <!-- position_id -->
      <CRow>
        <CCol sm="2">
          <label id="label-center" for="position">Position:</label>
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
          <label id="label-center" for="source">Source:</label>
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
          <CInput
            v-model="data.feedback"
            label="Feedback"
            placeholder="Enter feedback"
            horizontal
          />
        </CCol>
      </CRow>
      {{ isInterviewer }}

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
        <a href="./">
          <CButton color="primary"> Return </CButton>
        </a>
        <CButton v-if="this.id" color="success" @click="updateData">
          Update
        </CButton>
        <CButton v-else color="success" @click="addData"> Create </CButton>
      </div>
    </CCardFooter>
  </div>
</template>

<script>
import axios from "axios";

const urlSources = "http://candidate-manage.herokuapp.com/api/sources";
const urlPositions = "http://candidate-manage.herokuapp.com/api/positions";
const urlCandidatesProfiles =
  "http://candidate-manage.herokuapp.com/api/candidates-profiles";

export default {
  data() {
    return {
      urlSources,
      urlPositions,
      urlCandidatesProfiles,

      id: "",
      errors: [],
      positions: [],
      sources: [],

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
        note: "NULL",
        created_at: "",
      },

      filtered_results: [
        { value: 0, text: "New" },
        { value: 1, text: "Pass" },
        { value: 2, text: "Fail" },
      ],

      interview_results: [
        { value: 0, text: "" },
        { value: 2, text: "Fail" },
        { value: 1, text: "Pass" },
        { value: 3, text: "Sent Mail Interview" },
        { value: 4, text: "Sent Mail Thanks" },
        { value: 5, text: "Sent Mail Work" },
      ],
    };
  },

  mounted() {
    /**
     * call func getData if id is valid
     */
    if(this.$route.params.id)
      this.id = this.$route.params.id
    if (this.id) {
      this.getData();
    }

    /**
     * get data to position
     */
    axios.get(urlPositions).then((response) => {
      this.positions = response.data;
    });

    /**
     * get data to source
     */
    axios.get(urlSources).then((response) => {
      this.sources = response.data;
    });
  },

  computed: {
    /**
     * `isInterviewer` will check role is interviewer
     *  @return boolean
     */
    isInterviewer() {
      if (this.$auth.user.role_id === 2) return true;
      return false;
    }
  },

  methods: {
    /**
     * `getData` will get data by id
     */
    getData() {
      this.data = axios
        .get(this.urlCandidatesProfiles + "/" + this.id)
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
          .then(() => {
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
      if (!this.isInterviewer) {
        if (this.validate()) {
          axios
            .put(this.urlCandidatesProfiles + "/" + this.id, this.data)
            .then(() => {
              alert("Update data success");
              window.location.href = "./";
            })
            .catch(function (error) {
              alert(error);
            });
        }
      } else {
        axios
          .put(this.urlCandidatesProfiles + "/" + this.id, {
            feedback: this.data.feedback,
          })
          .then(() => {
            alert("Update data success");
            window.location.href = "./";
          })
          .catch(function (error) {
            alert(error);
          });
      }

      window.scrollTo(0, 0);
    },

    /**
     * `validate` update current data by id
     */
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

      return !this.errors.length;
    },
  },
};
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
