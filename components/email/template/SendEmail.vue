<template>
  <CCard>
    <CCardHeader class="center">
      <h3>
        Send Email
      </h3>
    </CCardHeader>
    <CCardBody>
      <div v-if="errors.length">
        <CAlert v-for="error in errors" :key="error" color="danger">
          {{ error }}
        </CAlert>
      </div>
      <br>
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.singleProfile.receiver"
            label="Receiver"
            placeholder="Receiver email"
            horizontal
            disabled
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CSelect
            :value.sync="data.singleProfile"
            :options="formatOptionsValueName(listProfiles)"
            label="Receiver name"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CSelect
            :value.sync="data.singleTemplate"
            :options="formatOptionsValue(listTemplates)"
            label="Email Template"
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
        <CButton color="success" @click="sendEmail">
          Submit
        </CButton>
        <CButton color="success" :class="colors[color]" @click="changeColor">
          Test
        </CButton>
      </div>
    </CCardFooter>
    {{ data }}
  </CCard>
</template>

<script>
import axios from 'axios'
import { URL_SEND_EMAIL, URL_CANDIDATE_PROFILES } from '~/common/constant/url'

export default {
  name: 'SendEmail',
  props: {
    listTemplates: {
      type: Array,
      default: () => []
    },
    listProfiles: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      id: '',
      errors: [],
      listTemplatesMapped: [],
      color: 0,
      colors: ['btn-danger', 'btn-primary', 'btn-secondary'],
      data: {
        receiver: '',
        receiverName: '',
        singleTemplate: {},
        singleProfile: {}
      }
    }
  },
  mounted () {
    console.log(typeof (this.listTemplates))
    console.log('haha')
    console.log(this.listTemplates)
  },
  methods: {
    changeColor () {
      if (this.color <= 1) { this.color++ } else { this.color = 0 }
    },
    sendEmail () {
      const dataEmail = {
        senderName: 'Me',
        receiver: this.data.singleProfile.receiver,
        receiverName: this.data.singleProfile.receiverName,
        title: this.data.singleTemplate.title,
        content: this.data.singleTemplate.content
      }
      axios.post(URL_SEND_EMAIL, dataEmail)
        .then(() => {
          alert('Send email success')
        }).catch((err) => {
          alert(err)
        })
      axios.put(URL_CANDIDATE_PROFILES + '/' + this.data.singleProfile.id,
        { interview_result: this.data.singleTemplate.id + 2 })
        .catch((err) => {
          alert(err)
        })
    },
    formatOptionsValue (listValue) {
      if (listValue.length) {
        return listValue.map((item) => {
          return { value: { id: item.id, title: item.title, content: item.content }, label: item.name }
        })
      }
      return []
    },
    formatOptionsValueName (listValue) {
      if (listValue.length) {
        return listValue.map((item) => {
          return {
            value: {
              id: item.id,
              receiver: item.email,
              receiverName: item.first_name + ' ' + item.last_name
            },
            label: item.first_name + ' ' + item.last_name
          }
        })
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
