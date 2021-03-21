<template>
  <CCard>
    <CCardHeader>
      <h4>
        Send Email Form
      </h4>
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
            :value="$auth.user.name"
            label="Sender"
            placeholder="Receiver email"
            horizontal
            disabled
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="linkedName"
            label="Receiver"
            placeholder="Receiver email"
            horizontal
            disabled
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="singleProfile.email"
            label="Receiver email"
            placeholder="Receiver email"
            horizontal
            disabled
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
    </CCardBody>
    <CCardFooter>
      <div class="right">
        <CButton color="success" @click="sendEmail">
          Submit
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
import axios from 'axios'
import { URL_SEND_EMAIL, URL_CANDIDATE_PROFILES } from '~/common/constant/url'

export default {
  name: 'SendEmail2',
  props: {
    listTemplates: {
      type: Array,
      default: () => []
    },
    singleProfile: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      errors: [],
      data: {
        singleTemplate: {},
        singleProfile: {}
      }
    }
  },

  computed: {
    /**
     * `linkedName` will linked first_name and last_name
     * @return String
     */
    linkedName () {
      return this.singleProfile.first_name + ' ' + this.singleProfile.last_name
    }
  },
  methods: {
    /**
     * `sendEmail` will send a request to send email
     */
    sendEmail () {
      if (!this.data.singleTemplate.id) {
        alert('Please choose email template')
        return
      }
      const dataEmail = {
        senderName: this.$auth.user.name,
        receiver: this.singleProfile.email,
        receiverName: this.linkedName,
        title: this.data.singleTemplate.title,
        content: this.data.singleTemplate.content
      }
      axios.post(URL_SEND_EMAIL, dataEmail)
        .then(() => {
          alert('Send email success')
          axios.put(URL_CANDIDATE_PROFILES + '/' + this.singleProfile.id,
            { interview_result: this.data.singleTemplate.id + 2 })
            .catch((err) => {
              alert(err)
            })
          this.$emit('after_send_email')
        }).catch((err) => {
          alert(err)
        })
    },

    /**
     * `formatOptionsValue` will change format item in array
     * @param listValue Array
     * @return Array
     */
    formatOptionsValue (listValue) {
      if (listValue.length) {
        return listValue.map((item) => {
          return { value: { id: item.id, title: item.title, content: item.content }, label: item.name }
        })
      }
      return []
    }
  }
}
</script>

<style scoped>

</style>
