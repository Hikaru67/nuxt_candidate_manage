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
            v-model="data.receiver"
            label="Receiver"
            placeholder="Enter receiver email"
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
          <CSelect
            :value.sync="data.receiverName"
            :options="formatOptionsValueName(listProfiles)"
            label="Receiver name"
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
      </div>
    </CCardFooter>
    {{ data }}
  </CCard>
</template>

<script>
import axios from 'axios'
import { URL_SEND_EMAIL } from '~/common/constant/url'

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
      data: {
        receiver: '',
        receiverName: '',
        singleTemplate: {}
      }
    }
  },
  methods: {
    sendEmail () {
      const dataEmail = {
        senderName: 'Me',
        receiver: this.data.receiver,
        receiverName: this.data.receiverName,
        title: this.data.singleTemplate.title,
        content: this.data.singleTemplate.content
      }
      axios.post(URL_SEND_EMAIL, dataEmail)
        .then(() => {
          alert('Send email success')
        }).catch((err) => {
          alert(err)
        })
    },
    formatOptionsValue (listValue) {
      if (listValue.length) {
        return listValue.map((item) => {
          return { value: { title: item.title, content: item.content }, label: item.name }
        })
      }
      return []
    },
    formatOptionsValueName (listValue) {
      if (listValue.length) {
        console.log(listValue)
        return listValue.map((item) => {
          console.log(item.first_name + ' ' + item.last_name)
          return { value: item.first_name + ' ' + item.last_name, label: item.first_name + ' ' + item.last_name }
        })
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
