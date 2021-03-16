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
      <td>
        {{ convertDate(item.created_at) }}
      </td>
    </template>
    {{ $route.fullPath }}
    <template #action="{ item }">
      <td>
        <CButton color="secondary" variant="ghost">
          <CIcon :content="$options.freeSet.cilNotes" />
        </CButton>
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
      items: []
    }
  },
  mounted () {
    /* fetch('http://candidate-manage.herokuapp.com/api/email-templates')
      .then(response => response.json())
      .then(function test (data) {
        // eslint-disable-next-line no-console
        console.log(data)
        this.items = data
      }) */
    axios.get(this.url)
      .then((response) => {
        this.items = response.data
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
    }
  }
}
</script>

<style scoped>

</style>
