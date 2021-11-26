<template lang="pug">
v-app
  // Side bar
  v-navigation-drawer(v-model='drawer', app style='z-index: 1001')
    v-list
      v-list-item(three-line)
        v-list-item-avatar
          v-img(src='https://www.thoughtco.com/thmb/X2cGHhkP7pjFMhriHXkJXPQJsek=/3071x2056/filters:fill(auto,1)/5385967-LGPT-56a5205a5f9b58b7d0daf257.jpg' go='/')
        v-list-item-content App Name
          v-subheader v{{ version }}
      template(v-if='!menuItems || !menuItems.length')
        v-list-item(v-for='n in 5' :key='n')
          v-skeleton-loader(type='sentences' min-width='100%')
      template(v-else)
        v-list-item(
          v-for='(item, i) in menuItems'
          :key='i'
          :to='item.to'
          router
          exact
        )
          v-list-item-action
            v-icon {{ item.icon }}
          v-list-item-content
            v-list-item-title(v-text='item.title')
  // Nav bar
  v-app-bar(
    app
    fixed
    collapse-on-scroll
  )
    v-app-bar-nav-icon(@click.stop='drawer = !drawer')
    v-spacer
    nuxt-link(to='/')
      v-toolbar-title My App
    v-spacer
  // Main content
  v-main
    nuxt
</template>

<script>
import { version } from '../package.json'

export default {
  data() {
    return {
      drawer: false,
      version,
    }
  },
  computed: {
    menuItems() {
      return [
        {
          icon: 'mdi-apps',
          title: this.$i18n('dashboard'),
          to: '/dashboard',
        },
        {
          icon: 'mdi-account-details',
          title: this.$i18n('users'),
          to: '/users',
        },
        {
          icon: 'mdi-badge-account-horizontal-outline',
          title: this.$i18n('roles'),
          to: '/roles',
        },
        {
          icon: 'mdi-security',
          title: this.$i18n('permissions'),
          to: '/permissions',
        },
      ]
    },
  },
}
</script>

<style>
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
</style>
