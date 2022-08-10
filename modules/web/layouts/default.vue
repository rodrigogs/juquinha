<template lang="pug">
v-app
  v-layout
    // Side bar
    v-navigation-drawer(app v-model='drawer' bottom)
      v-list
        v-list-item(
          prepend-avatar='https://m.bug.hr/_cache/6a807158c662a9937a31c64c967594b2.jpg'
          title='App Name'
          lines='three'
        )
      v-divider
      v-list
        v-list-item(
          v-for='(item, i) in menuItems'
          :key='i'
          :to='item.to'
          :prepend-icon='item.icon'
          :title='item.title'
          active-color='primary'
        )
    // Nav bar
    v-app-bar(app elevation='1')
      v-app-bar-nav-icon(variant='text' @click.stop='drawer = !drawer')
      v-spacer
      v-toolbar-title My App
    // Main content
    v-main
      slot
</template>

<script setup>
const { $i18n } = useNuxtApp()

const drawer = ref(null)
const menuItems = ref([
  {
    icon: 'mdi-apps',
    title: $i18n('dashboard'),
    to: '/',
  },
  {
    icon: 'mdi-account-details',
    title: $i18n('users'),
    to: '/users',
  },
  {
    icon: 'mdi-badge-account-horizontal-outline',
    title: $i18n('roles'),
    to: '/roles',
  },
  {
    icon: 'mdi-security',
    title: $i18n('permissions'),
    to: '/permissions',
  },
])
</script>

<style>
@import 'https://unpkg.com/@mdi/font@5.x/css/materialdesignicons.min.css';

* {
  scrollbar-width: thin;
  scrollbar-color: #dddde2 #8d8d92;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

*::-webkit-scrollbar-track {
  background: #dddde2;
}

*::-webkit-scrollbar-thumb {
  background-color: #8d8d92;
  border-radius: 20px;
}

.main-row {
  height: 100% !important;
  max-height: 100%;
  min-height: 100%;
}

.text--break-on-word {
  white-space: pre-wrap !important;
  word-break: normal !important;
}

.v-card-title.primary {
  background-color: #7caec9;
}

.v-card-title.secondary {
  background-color: #ff9e80;
}
</style>
