<template>
  <CContainer class="d-flex align-items-center min-vh-100">
    <CRow class="justify-content-center">
      <CCol md="8">
        <CCardGroup>
          <CCard class="p-4">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">
                  Sign In to your account
                </p>
                <CInput
                  v-model="userForm.username"
                  placeholder="Username"
                  autocomplete="username email"
                >
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput
                  v-model="userForm.password"
                  placeholder="Password"
                  type="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CRow>
                  <CCol col="6">
                    <CButton color="primary" class="px-4" @click="login">
                      Login
                    </CButton>
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="link" class="px-0">
                      Forgot password?
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
          <CCard
            color="primary"
            text-color="white"
            class="text-center py-5 d-md-down-none"
            style="width:44%"
            body-wrapper
          >
            <h2>Sign up</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href="/register">
              <CButton
                color="primary"
                class="active mt-3"
              >
                Register Now!
              </CButton>
            </a>
            <CButton
              color="primary"
              class="active mt-3"
              @click="logout"
            >
              logout!
            </CButton>
          </CCard>
        </CCardGroup>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  auth: false,
  layout: 'empty',
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      },
      data: ''
    }
  },
  created () {
    // eslint-disable-next-line no-console
    console.log(this.$auth.user)
    alert(this.$auth.user)
    if (this.$auth.$state.loggedIn) {
      // this.$router.push('/')
    }
  },
  methods: {
    async login () {
      try {
        await this.$auth
          .loginWith('local', {
            data: this.userForm
          })
          .then(() => this.$router.push('/'))
      } catch (er) {
        alert(er)
      }
    },

    login2 () {
      axios.post('http://127.0.0.1:8000/api/auth/login', this.userForm)
        .then((res) => {
          alert(res.statusText)
        })
    },

    logout () {
      this.$auth.logout()
    }
  }
}
</script>
