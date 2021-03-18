<template>
  <Dashboard />
</template>

<script>
import Dashboard from './dashboard'

export default {
  middleware: 'auth',
  components: {
    Dashboard
  }
}
</script>
