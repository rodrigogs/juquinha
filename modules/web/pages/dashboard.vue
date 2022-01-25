<template lang="pug">
v-container
  v-row
    v-col
      h1 Dashboard
      h2 Welcome to your dashboard
</template>

<script>
import { defineComponent as dc } from '#imports'

export default dc({
  name: 'Dashboard',
  data() {
    return {
      Test: 'Test'
    }
  }
})
</script>
