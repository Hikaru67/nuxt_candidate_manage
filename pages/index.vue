<template>
  <Dashboard />
</template>

<script>
import Dashboard from './dashboard'

export default {
  middleware: 'auth',
  components: {
    Dashboard
  },
  created () {
    this.$mail.send({
      from: 'John Doe',
      subject: 'Incredible',
      text: 'This is an incredible test message',
      to: 'johndoe@gmail.com'
    })
  }
}
</script>
