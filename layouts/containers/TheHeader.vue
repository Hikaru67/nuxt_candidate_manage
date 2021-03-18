<template>
  <CHeader fixed with-subheader light>
    <CToggler
      v-c-emit-root-event:toggle-sidebar-mobile
      in-header
      class="ml-3 d-lg-none"
    />
    <CToggler
      v-c-emit-root-event:toggle-sidebar
      in-header
      class="ml-3 d-md-down-none"
    />
    <CHeaderBrand
      class="mx-auto d-lg-none"
      src=""
      width="190"
      height="46"
      alt="CoreUI Logo"
    />
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          Dashboard
        </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon :content="$options.freeSet.cilBell" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <span style="text-transform: uppercase">{{ roles[$auth.user.role_id-1] }}</span>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          {{ $auth.user.username }}
        </CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <!--    <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0" />
    </CSubheader>-->
  </CHeader>
</template>

<script>
import { freeSet } from '@coreui/icons'
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

export default {
  name: 'TheHeader',
  freeSet,
  components: {
    TheHeaderDropdownAccnt
  },
  data () {
    return {
      roles: ['Human Resources', 'Interviewer']
    }
  }
}
</script>
