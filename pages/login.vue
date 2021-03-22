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
// eslint-disable-next-line no-unused-vars
import axios from 'axios'

export default {
  name: 'Login',
  auth: false,
  layout: 'blank',
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  beforeCreate () {
    if (this.$auth.$state.loggedIn) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.location.href = '/'
    }
  },
  methods: {
    /**
     * `login` will login account and redirect to home if that work be done
     */
    async login () {
      try {
        await this.$auth
          .loginWith('local', {
            data: this.userForm
          })
          .then(function () {
            // this.$router.push('/')
            window.location.href = '/dashboard'
          })
      } catch (er) {
        alert(er)
      }
    },

    /**
     * `logout` will logout current account
     */
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
