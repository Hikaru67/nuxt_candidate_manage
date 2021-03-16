<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show.sync="show"
  >
    <CSidebarBrand
      :img-full="{ width: 118, height: 46, alt: 'Logo', src: 'https://toppng.com/uploads/preview/free-icons-black-cat-icon-11553449254b2amf0pgah.png'}"
      :img-minimized="{ width: 118, height: 46, alt: 'Logo', src: 'https://toppng.com/uploads/preview/free-icons-black-cat-icon-11553449254b2amf0pgah.png'}"
      :wrapped-in-link="{ href: 'https://coreui.io/', target: '_blank'}"
    />
    <CRenderFunction v-if="!$auth.loggedIn" flat :content-to-render="nav" />
    <CRenderFunction v-else-if="$auth.user.role_id === 2" flat :content-to-render="nav" />
    <CRenderFunction v-else-if="$auth.user.role_id === 1" flat :content-to-render="nav2" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="minimize = !minimize"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'
// eslint-disable-next-line import/namespace,import/default,import/no-named-as-default,import/no-named-as-default-member
import nav2 from './_nav2'

export default {
  name: 'TheSidebar',
  data () {
    return {
      minimize: false,
      nav,
      nav2,
      show: 'responsive'
    }
  },
  mounted () {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })
  }
}
</script>
