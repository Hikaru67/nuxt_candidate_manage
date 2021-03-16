<template>
  <CContainer class="min-vh-100 d-flex align-items-center">
    <CRow class="w-100 justify-content-center">
      <CCol md="6" sm="8">
        <CCard class="mx-4 mb-0">
          <CCardBody class="p-4">
            <CForm>
              <h1>Register</h1>
              <p class="text-muted">
                Create your account
              </p>
              <CInput
                v-model="userForm.username"
                placeholder="Username"
                autocomplete="username"
              >
                <template #prepend-content>
                  <CIcon name="cil-user" />
                </template>
              </CInput>
              <CInput
                v-model="userForm.email"
                placeholder="Email"
                autocomplete="email"
                prepend="@"
              />
              <CInput
                v-model="userForm.password"
                placeholder="Password"
                type="password"
                autocomplete="new-password"
              >
                <template #prepend-content>
                  <CIcon name="cil-lock-locked" />
                </template>
              </CInput>
              <CInput
                placeholder="Repeat password"
                type="password"
                autocomplete="new-password"
                class="mb-4"
              >
                <template #prepend-content>
                  <CIcon name="cil-lock-locked" />
                </template>
              </CInput>
              <CButton color="success" block @click="registerUser">
                Create Account
              </CButton>
            </CForm>
          </CCardBody>
          <CCardFooter class="p-4">
            <CRow>
              <CCol col="6">
                <CButton block color="facebook">
                  Facebook
                </CButton>
              </CCol>
              <CCol col="6">
                <CButton block color="twitter">
                  Twitter
                </CButton>
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Register',
  layout: 'empty',
  auth: false,
  data () {
    return {
      userForm: {
        username: '',
        name: 'asdas',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async registerUser () {
      // vì chúng ta không khai báo API register trong phần config nên phải dùng axios để gọi đến API
      const res = await this.$axios.post('register', this.userForm)
      // đăng ký xong tự động login luôn
      this.$auth.loginWith('local', {
        data: this.userForm
      }).then(() => {
        this.$router.push('/u/' + res.data.data.id) // rồi chuyển hướng đến một trang nào
      })
    }
  }
}
</script>
