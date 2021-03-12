<template>
  <div>
    <CRow v-for="{ value, name } in form" :key="name">
      <CCol sm="10">
        {{ form }}
        <CInput
          v-if="name !== `content`"
          :v-model="value"
          :label="form.name"
          :placeholder="`Enter email `+form.name"
          horizontal
        />
        <CTextarea
          v-else
          :v-model="property"
          label="Content"
          rows="10"
          placeholder="Enter email content"
          horizontal
        />
      </CCol>
    </CRow>
    <!--    <CRow>
      <CCol sm="10">
        <CInput
          v-model="form.title"
          label="Title"
          placeholder="Enter email title"
          horizontal
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="10">
        <CTextarea
          v-model="form.content"
          label="Content"
          rows="10"
          placeholder="Enter email content"
          horizontal
        />
      </CCol>
    </CRow>-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FormData',
  props: {
    url: String,
    form: Object
  },
  data () {
    return {

    }
  },
  methods: {
    addData () {
      axios.post(this.url, this.form)
        .then(function () {
          alert('Add data success')
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
