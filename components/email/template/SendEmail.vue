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
      <CRow>
        <CCol sm="10">
          <CInput
            v-model="data.name"
            label="Name Sender"
            placeholder="Enter email name"
            horizontal
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="10">
          <CSelect
            :value.sync="data.singleTemplate"
            :options="listTemplates"
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
        <CButton v-if="id" color="success" @click="sendEmail">
          Submit
        </CButton>
      </div>
    </CCardFooter>
  </CCard>
</template>

<script>
export default {
  name: 'SendEmail',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    listTemplates: Array,
    // eslint-disable-next-line vue/require-default-prop
    listProfiles: Array
  },
  data () {
    return {
      id: '',
      errors: [],
      data: {
        name: '',
        singleTemplate: {}
      }
    }
  },
  beforeMount () {
    console.log(this.listTemplates)
    this.listTemplates = this.listTemplates.map((item) => {
      return { value: item.listTemplates, label: item.name }
    })
  }
}
</script>

<style scoped>

</style>
