<template>
  <CCard>
    {{ data }}
    <CCardHeader class="center">
      <h3 v-if="id">
        Edit Source
      </h3>
      <h3 v-else>
        Create Source
      </h3>
    </CCardHeader>
    <CCardBody>
      <div v-if="errors.length">
        <CAlert v-for="error in errors" :key="error" color="danger">
          {{ error }}
        </CAlert>
      </div>
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="singleSource.name"
            label="Name"
            placeholder="Enter source name"
            horizontal
          />
        </CCol>
      </CRow>
    </CCardBody>
    <CCardFooter>
      <div class="center">
        <a href="./">
          <CButton color="primary">
            Return
          </CButton>
        </a>
        <CButton v-if="singleSource" color="success" @click="updateData">
          Submit
        </CButton>
        <CButton v-else color="success" @click="addData">
          Submit
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import axios from 'axios'
import { URL_RESOURCES } from '~/common/constant/url'

export default {
  name: 'AddSource',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    singleSource: {
      type: Object,
      default: () => {
        return {
          name: ''
        }
      }
    }
  },
  data () {
    return {
      id: '',
      errors: [],
      data: {
        name: ''
      }
    }
  },

  async created () {
    this.id = this.$route.params.id
    if (this.id) {
      this.data = await this.singleSource
    }
    console.log(this.singleSource)
  },

  methods: {
    /**
     * `addData` add a new data to database
     */
    addData () {
      if (this.validate()) {
        axios.post(URL_RESOURCES, this.data)
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
        axios.put(URL_RESOURCES + '/' + this.$route.params.id, this.data)
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

    /**
     * `validate` check data validity
     * @returns {boolean} the valid of errors.length
     */
    validate () {
      this.errors = []

      if (!this.singleSource.name) {
        this.errors.push('source name required.')
      }

      return !this.errors.length
    }
  }
}
</script>

<style scoped>
  .center {
    text-align: center;
  }
</style>
