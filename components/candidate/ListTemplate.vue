<template>
  <CCard>
    <CCardHeader class="center">
      <h3>List Profile</h3>
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
              {{ convertFilteredResult(item.filtered_result) }}</span
            >
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
            <CButton
              class="col-3"
              color="primary"
              variant="ghost"
              @click="editData(item.id)"
            >
              <CIcon :content="$options.freeSet.cilPencil" />
            </CButton>
            <CButton
              class="col-3"
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
              type="button"
              id="filtered_result-button"
              :value="convertFilteredResult(item.filtered_result)"
              @click="transformButton(item.id, item.filtered_result)"
              @load="
                buttonComponent(convertFilteredResult(item.filtered_result))
              "
            />
            <slot></slot>
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
            <!-- <CButton color="secondary" variant="ghost">
              <CIcon :content="$options.freeSet.cilPencil" />
            </CButton> -->
            <CButton
              class="col-1"
              color="primary"
              variant="ghost"
              @click="editData(item.id)"
            >
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
import { freeSet } from "@coreui/icons";
import axios from "axios";

const urlSources = "http://candidate-manage.herokuapp.com/api/sources";
const urlPositions = "http://candidate-manage.herokuapp.com/api/positions";
const urlCandidatesProfiles =
  "http://candidate-manage.herokuapp.com/api/candidates-profiles";

export default {
  name: "ListTemplate",
  freeSet,
  data() {
    return {
      fields: [
        "id",
        "first_name",
        "last_name",
        "position_id",
        "source_id",
        "received_date",
        "filtered_result",
        "interview_date",
        "feedback",
        "interview_result",
        "cv_link",
        "note",
        "created_at",
        "updated_at",
        {
          key: "action",
          label: "",
        },
      ],
      items: [],
      positions: [],
      sources: [],
      filtered_results: [
        { value: 0, text: "Pending" },
        { value: 1, text: "Pass" },
        { value: 2, text: "Fail" },
      ],
      interview_results: [
        { value: 0, text: "Pending" },
        { value: 2, text: "Fail" },
        { value: 1, text: "Pass" },
      ],
    };
  },

  mounted() {
    //   get data to items
    axios.get(urlCandidatesProfiles).then((response) => {
      this.items = response.data;
    });

    //   get data to position
    axios.get(urlPositions).then((response) => {
      this.positions = response.data;
    });

    //   get data to position
    axios.get(urlSources).then((response) => {
      this.sources = response.data;
    });
  },

  methods: {
    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate(date) {
      date = new Date(date);
      return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    },

    /**
     * `convertPosition` will convert from position id to position name
     * @param id Integer
     */
    convertPosition(id) {
      let result = this.positions.find((item) => {
        return item.id === id;
      });
      return result ? result.name : "";
    },

    /**
     * `convertSource` will convert from source id to source name
     * @param id Integer
     */
    convertSource(id) {
      let result = this.sources.find((item) => {
        return item.id === id;
      });
      return result ? result.name : "";
    },

    /**
     * `convertFilteredResult` will convert from value to text of FilteredResult
     * @param value Integer
     */
    convertFilteredResult(value) {
      let result = this.filtered_results.find((item) => {
        return item.value === value;
      });
      let temp = result ? result.text : "";
      // let buttonComponent = document.querySelector("#filtered_result-button");
      // // if(!buttonComponent) return buttonComponent
      // console.log("ádfjkhsdjfk"+buttonComponent);
      // this.convertClassButton(buttonComponent, temp);

      return temp;
    },

    /**
     * `convertInterviewResult` will convert from value to text of InterviewResult
     * @param value Integer
     */
    convertInterviewResult(value) {
      let result = this.interview_results.find((item) => {
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
      axios
        .delete(this.urlCandidatesProfiles + id)
        .then((res) => {
          alert("Delete data success");
          window.location.href = "./";
        })
        .catch(function (error) {
          alert(error);
        });
    },

    transformButton(idComponent, id) {
      let buttonComponent = document.querySelector("#filtered_result-button");
      console.log("idComponent " + idComponent);

      // id increase
      id += 1;
      if (id > 2) {
        id = 0;
      }

      // find item update
      let item = this.items.find((e) => e.id === idComponent);
      if (item) {
        item.filtered_result = id;
      }

      //update item
      axios
        .put(urlCandidatesProfiles + "/" + idComponent, item)
        .then((res) => {})
        .catch(function (error) {
          console.log(error);
        });

      // convert class button
      console.log(buttonComponent);
      if (buttonComponent) {
        this.convertClassButton(buttonComponent, buttonComponent.value);
      } else return "";
    },

    //
    convertClassButton(Component, value) {
      if (value === "Pending") {
        Component.classList.add("btn", "m-2", "btn-warning", "btn-square");
      } else if (value === "Pass") {
        Component.classList.add("btn", "m-2", "btn-success", "btn-square");
      } else if (value === "Fail") {
        Component.classList.add("btn", "m-2", "btn-danger", "btn-square");
      } else return "";
    },
  },
};
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
