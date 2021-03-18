<template>
  <CDataTable
    :items="listSources"
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
      <td style="max-width: 60px">
        {{ convertDate(item.created_at) }}
      </td>
    </template>

    <template #source_id="{ item }">
      <td style="max-width: 60px">
        {{ getSource(item.source_id) }}
      </td>
    </template>

    <template #action="{ item }">
      <td style="max-width: 90px">
        <CButton color="primary" variant="ghost" @click="toEditPage(item.id)">
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
import axios from 'axios'
import { freeSet } from '@coreui/icons'
import { URL_RESOURCES } from '~/common/constant/url'

export default {
  name: 'ListSource',
  // eslint-disable-next-line vue/require-default-prop
  props: { listSources: Array },
  freeSet,
  data () {
    return {
      fields: ['id', 'name', 'created_at',
        {
          key: 'action',
          label: ''
        }]
    }
  },
  methods: {
    /**
     * `convertDate` will convert format date
     * @param date String
     */
    convertDate (date) {
      return new Date(date).toLocaleDateString()
    },

    /**
     * `editData` will redirect to edit data page
     * @param id String
     */
    toEditPage (id) {
      this.$router.push(this.$route.path + '/' + id)
    },

    /**
     * `deleteData` will delete data by id
     * @param id String
     */
    deleteData (id) {
      axios.delete(URL_RESOURCES + '/' + id)
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
