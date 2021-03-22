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
          <CInput
            v-model="data.singleTemplate.title"
            label="Title email"
            placeholder="Title email"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow v-if="data.singleTemplate.id === 1">
        <CCol sm="10">
          <CInput
            v-model="time"
            label="Interview schedule"
            type="datetime-local"
            horizontal
            @change="updateContent"
          />
        </CCol>
      </CRow>
      <CRow v-if="data.singleTemplate.id === 3">
        <CCol sm="10">
          <CInput
            v-model="data.time"
            label="Work schedule"
            type="datetime-local"
            horizontal
            @change="updateContent"
          />
        </CCol>
      </CRow>
      <CRow v-if="data.singleTemplate.id === 3">
        <CCol sm="10">
          <CInput
            v-model="data.salary"
            label="Salary"
            placeholder="Enter Salary"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CTextarea
            v-model="data.singleTemplate.content"
            label="Content email"
            placeholder="Content email"
            rows="10"
            disabled
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
  name: 'SendEmail',
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
      time: '',
      data: {
        singleTemplate: {},
        singleProfile: {},
        time: '',
        salary: ''
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
    updateContent () {
      const ins = new Date(this.time).toDateString()
      if (ins) {
        if (this.data.singleTemplate.id === 1) {
          const temp = this.data.singleTemplate.content.split('Thời gian: ')
          console.log(temp[0] + 'Thời gian: ' + ins + temp[1])
          this.data.singleTemplate.content = temp[0] + 'Thời gian: ' + ins + temp[1].substr(15, temp[1].length - 15)
        } else {
          const temp = this.data.singleTemplate.content.split('Xin vui lòng phản hồi cho chúng tôi trước ')
          console.log(temp[0] + 'Thời gian: ' + ins + temp[1])
          this.data.singleTemplate.content = temp[0] + 'Xin vui lòng phản hồi cho chúng tôi trước ' + ins + temp[1].substr(15, temp[1].length - 15)
        }
      }
    },
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
        time: this.data.time,
        salary: this.data.salary,
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
