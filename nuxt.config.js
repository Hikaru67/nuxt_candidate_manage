export default {
  mode: 'spa',
  /*
     ** Headers of the page
     */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://use.fontawesome.com/releases/v5.15.2/js/all.js' }
    ]
  },
  /*
     ** Customize the progress-bar color
     */
  loading: { color: '#fff' },
  /*
     ** Global CSS
     */
  css: [
    { src: '~/assets/scss/style.scss', lang: 'scss' }
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
  },
  /*
     ** Plugins to load before mounting the App
     */
  plugins: [
    { src: '~/plugins/coreui' }
  ],
  /*
     ** Nuxt.js dev-modules
     */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module'
    ['nuxt-mail', {
      smtp: {
        host: 'smtp.example.com',
        port: 587
      }
    }]
  ],
  mail: {
    smtp: {
      host: 'smtp.example.com',
      port: 587
    }
  },
  /*
     ** Nuxt.js modules
     */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
  axios: {
    baseURL: 'http://127.0.0.1:8000/api'
  },
  /*
     ** Build configuration
     */
  build: {
    /*
         ** You can extend webpack config here
         */
    extend (config, ctx) {}
  },
  auth: {
    redirect: {
      callback: 'dashboard/dashboard', // sau khi login sẽ chuyển hướng về đây
      login: '/login',
      logout: '/',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          // các đường dẫn đến API
          // propertyName: kết quả từ API trả về, nhớ xem kết quả để đặt key cho đúng
          login: { url: '/login', method: 'post', propertyName: 'meta.token' },
          user: { url: '/user', method: 'get', propertyName: 'data' },
          logout: false // { url: '/auth/logout', method: 'get', propertyName: 'data' }
        }
      }
    }
  },
  // dùng cái này để sử dụng middleware xác thực người dùng cho mọi route, tương tự middleware trong Laravel
  router: {
    middleware: ['auth']
  }
}
