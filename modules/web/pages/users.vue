<template lang="pug">
v-container
  v-row
    v-col
      UsersCRUD
</template>

<script>
import i18n from 'lib/i18n'
import UsersCRUD from '@/components/users/UsersCRUD'

export default {
  components: { UsersCRUD },
  head: {
    title: i18n('users'),
  },
  meta: { auth: {} },
}
</script>
