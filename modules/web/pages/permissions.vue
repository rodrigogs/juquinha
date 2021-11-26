<template lang="pug">
v-container
  v-row
    v-col
      PermissionsCRUD
</template>

<script>
import PermissionsCRUD from '@/components/permissions/PermissionsCRUD'
import i18n from 'lib/i18n'

export default {
  components: { PermissionsCRUD },
  head: {
    title: i18n('permissions'),
  },
  meta: { auth: {} },
}
</script>
