<template lang="pug">
v-container
  v-row
    v-col
      RolesCRUD
</template>

<script>
import i18n from 'lib/i18n'
import RolesCRUD from '@/components/roles/RolesCRUD'

export default {
  components: { RolesCRUD },
  head: {
    title: i18n('roles'),
  },
  meta: { auth: {} },
}
</script>
