<template>
  <CCard>
    <CCardHeader class="center">
      <h3 v-if="id">
        Edit Email Template
      </h3>
      <h3 v-else>
        Create Email Template
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
            v-model="data.name"
            label="Name"
            placeholder="Enter email name"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.title"
            label="Title"
            placeholder="Enter email title"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CTextarea
            v-model="data.content"
            label="Content"
            rows="10"
            placeholder="Enter email content"
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
        <CButton v-if="id" color="success" @click="updateData">
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
import { URL_EMAIL_TEMPLATES } from '~/common/constant/url'

export default {
  name: 'AddTemplate',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    singleTemplate: {
      type: Object
    }
  },
  data () {
    return {
      id: '',
      errors: [],
      data: {
        name: '',
        title: '',
        content: ''
      }
    }
  },

  /**
   * get param id from url and call method getData
   */
  async mounted () {
    this.id = this.$route.params.id
    if (this.id) {
      this.data = await this.singleTemplate
    }
  },
  methods: {
    /**
     * `addData` add a new data to database
     */
    addData () {
      if (this.validate()) {
        axios.post(URL_EMAIL_TEMPLATES, this.data)
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
        axios.put(URL_EMAIL_TEMPLATES + this.id, this.data)
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

      if (!this.data.name) {
        this.errors.push('Email name required.')
      }
      if (!this.data.title) {
        this.errors.push('Email title required.')
      }
      if (!this.data.content) {
        this.errors.push('Email content required.')
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
