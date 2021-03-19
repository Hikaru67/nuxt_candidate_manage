<template>
  <CDataTable
    :items="DATA"
    :fields="fields[$auth.user.role_id - 1]"
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
    <!-- linked name -->
    <template #full_name="{ item }" class="full_name">
      <td>
        <span class="full-name">{{ linkedName(item.first_name, item.last_name) }}</span>
      </td>
    </template>

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
        />
      </td>
      <td v-else>
        <span class="">{{ convertFilteredResult(item.filtered_result) }}</span>
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
        />
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

    <!-- note -->
    <!-- <template #note="{ item }">
      <td>
        {{ item.note }}
      </td>
    </template> -->

    {{ $route.fullPath }}

    <template #action="{ item }">
      <td class="row">
        <CButton color="primary" variant="ghost" @click="editData(item.id)">
          <CIcon :content="$options.freeSet.cilPencil" />
        </CButton>
        <CButton
          v-if="isInterviewer"
          color="danger"
          variant="ghost"
          @click="deleteData(item.id)"
        >
          <CIcon :content="$options.freeSet.cilTrash" />
        </CButton>
      </td>
    </template>
  </CDataTable>

  <!-- <CDataTable
    v-else-if="$auth.user.role_id === 2"
    :items="DATA"
    :fields="fields[$auth.user.role_id - 1]"
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
  > -->
  <!-- linked name -->
  <!-- <template #full_name="{ item }" class="full_name">
      <td>
        <span class="">{{ linkedName(item.first_name, item.last_name) }}</span>
      </td>
    </template> -->

  <!-- convertData interview_date -->
  <!-- <template #interview_date="{ item }" class="test">
      <td>
        <span class="">{{ convertDate(item.interview_date) }}</span>
      </td>
    </template> -->

  <!-- convertData received_date -->
  <!-- <template #received_date="{ item }">
      <td>
        <span class="">{{ convertDate(item.received_date) }}</span>
      </td>
    </template> -->

  <!-- convertData created_at -->
  <!-- <template #created_at="{ item }">
      <td>
        <span class="">{{ convertDate(item.created_at) }}</span>
      </td>
    </template> -->

  <!-- <template #cv_link="{ item }">
      <td>
        <span class="test2">{{ item.cv_link }}</span>
      </td>
    </template> -->

  <!-- convertData updated_at -->
  <!-- <template #updated_at="{ item }">
      <td>
        <span class="">{{ convertDate(item.updated_at) }}</span>
      </td>
    </template> -->

  <!-- convertData position_id -->
  <!-- <template #position_id="{ item }">
      <td>
        <span class="">{{ convertPosition(item.position_id) }}</span>
      </td>
    </template> -->

  <!-- convertData source_id -->
  <!-- <template #source_id="{ item }">
      <td>
        <span class=""> {{ convertSource(item.source_id) }}</span>
      </td>
    </template> -->

  <!-- convertData filtered_result -->
  <!-- <template #filtered_result="{ item }">
      <td>
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
    </template> -->

  <!-- feedback -->
  <!-- <template #feedback="{ item }">
      <td>
        {{ item.feedback }}
      </td>
    </template> -->

  <!-- note -->
  <!-- <template #note="{ item }">
      <td>
        {{ item.note }}
      </td>
    </template> -->

  <!-- convertData interview_result -->
  <!-- <template #interview_result="{ item }">
      <td v-if="item.filtered_result === 1">
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
    </template> -->

  <!-- {{ $route.Path }} -->

  <!-- <template #action="{ item }">
      <td class="row">
        <CButton color="primary" variant="ghost" @click="editData(item.id)">
          <CIcon :content="$options.freeSet.cilPencil" />
        </CButton>

        <CButton
          v-if="!isInterviewer"
          color="danger"
          variant="ghost"
          @click="deleteData(item.id)"
        >
          <CIcon :content="$options.freeSet.cilTrash" />
        </CButton>
      </td>
    </template> -->
  <!-- </CDataTable>  -->
</template>

<script>
import { freeSet } from "@coreui/icons";
import axios from "axios";

const urlSources = "http://candidate-manage.herokuapp.com/api/sources";
const urlPositions = "http://candidate-manage.herokuapp.com/api/positions";
const urlCandidatesProfiles =
  "http://candidate-manage.herokuapp.com/api/candidates-profiles";
export default {
  name: "ListTemplate",
  props: ["DATA"],

  freeSet,

  data() {
    return {
      fields: [
        [
          {
            key: "id",
            label: "ID",
          },
          {
            key: "full_name",
            label: "Full Name",
          },
          {
            key: "position_id",
            label: "Position",
          },
          {
            key: "source_id",
            label: "Source",
          },
          "cv_link",
          "received_date",
          "filtered_result",
          "interview_date",
          "feedback",
          "interview_result",
          {
            key: "action",
            label: "",
          },
        ],
        [
          {
            key: "id",
            label: "ID",
          },
          {
            key: "full_name",
            label: "Full Name",
          },
          {
            key: "position_id",
            label: "Position",
          },
          {
            key: "source_id",
            label: "Source",
          },
          "cv_link",
          "received_date",
          "filtered_result",
          "interview_date",
          "feedback",
          "interview_result",
          {
            key: "action",
            label: "",
          },
        ],
      ],

      color: [
        "btn-secondary",
        "btn-success",
        "btn-danger",
        "btn-warning",
        "btn-danger",
        "btn-success",
      ],

      positions: [],

      sources: [],

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

      /**
       *
                (item.filtered_result === 2 &&
                  'btn m-2 btn-danger btn-square') ||
                (item.filtered_result === 1 &&
                  'btn m-2 btn-success btn-square') ||
                (item.filtered_result === 0 && 'btn m-2 btn-warning btn-square')
              "
       */

      classObject: {},
    };
  },
  mounted() {
    // get data to position
    axios.get(urlPositions).then((response) => {
      this.positions = response.data;
    });

    // get data to source
    axios.get(urlSources).then((response) => {
      this.sources = response.data;
    });
  },

  methods: {
    /**
     * `isInterviewer` will check role is interviewer
     *  @return boolean
     */
    isInterviewer() {
      return this.$auth.user.role_id === 2;
    },

    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate(date) {
      return new Date(date).toLocaleDateString();
    },

    /**
     * `linkedName` will linked firstName and lastName
     * @param firstName String
     * @param lastName String
     * @return String
     */
    linkedName(firstName, lastName) {
      return firstName + " " + lastName;
    },

    /**
     * `convertPosition` will convert from position id to position name
     * @param id Integer
     */
    convertPosition(id) {
      const result = this.positions.find((item) => {
        return item.id === id;
      });
      return result ? result.name : "";
    },

    /**
     * `convertSource` will convert from source id to source name
     * @param id Integer
     */
    convertSource(id) {
      const result = this.sources.find((item) => {
        return item.id === id;
      });
      return result ? result.name : "";
    },

    /**
     * `convertFilteredResult` will convert from value to text of FilteredResult
     * @param value Integer
     */
    convertFilteredResult(value) {
      const result = this.filtered_results.find((item) => {
        return item.value === value;
      });
      const temp = result ? result.text : "";
      return temp;
    },

    /**
     * `convertInterviewResult` will convert from value to text of InterviewResult
     * @param value Integer
     */
    convertInterviewResult(value) {
      const result = this.interview_results.find((item) => {
        return item.value === value;
      });
      return result ? result.text : "";
    },

    /**
     * `editData` will redirect to edit data page
     * @param id String
     */
    editData(id) {
      window.location.href = "./" + id;
    },

    /**
     * `deleteData` will delete data by id
     * @param id String
     */
    deleteData(id) {
      // eslint-disable-next-line no-console
      axios
        .delete(this.$store.state.url.API_CANDIDATE_PROFILES_URL + "/" + id)
        .then((res) => {
          alert("Delete data success");
          window.location.href = "./";
        })
        .catch(function (error) {
          alert(error);
        });
    },

    /**
     * `transformButtonFilteredResult` update status of FilteredResult
     * @param id String
     * @param idProfile String
     */
    transformButtonFilteredResult(idProfile) {
      const dataProfile = this.DATA.find((e) => e.id === idProfile);

      if (dataProfile.filtered_result === 2) {
        dataProfile.interview_result = 0;
      }
      dataProfile.filtered_result++;
      if (dataProfile.filtered_result > 2) {
        dataProfile.filtered_result = 1;
      }

      axios
        .put(urlCandidatesProfiles + "/" + idProfile, dataProfile)
        .catch(function (error) {
          console.log(error);
        });
    },

    /**
     * `transformButtonInterviewResult` update status of InterviewResult
     * @param idProfile Int
     */
    transformButtonInterviewResult(idProfile) {
      const dataProfile = this.DATA.find((e) => e.id === idProfile);

      // dataProfile.interview_result++;
      if (dataProfile.interview_result < 3) {
        if (dataProfile.interview_result === 2)
          dataProfile.interview_result = 1;
        else if (dataProfile.interview_result === 1)
          dataProfile.interview_result = 2;
        else dataProfile.interview_result++;

        axios
          .put(urlCandidatesProfiles + "/" + idProfile, dataProfile)
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
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

.full-name{
  
}
</style>
