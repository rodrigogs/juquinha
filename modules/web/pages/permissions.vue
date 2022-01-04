<template lang="pug">
v-container
  v-row
    v-col
      PermissionsCRUD
</template>

<script>
import i18n from 'lib/i18n'
import PermissionsCRUD from '@/components/permissions/PermissionsCRUD'

export default {
  components: { PermissionsCRUD },
  head: {
    title: i18n('permissions'),
  },
  meta: { auth: {} },
}
</script>
