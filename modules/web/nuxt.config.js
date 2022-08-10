import path from 'path'
import { defineNuxtConfig } from 'nuxt'
import { API_URL } from '@juquinha/config/env.mjs'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  vuetify: {
    customVariables: true,
    treeShake: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  runtimeConfig: {
    public: {
      API_URL: API_URL || 'http://localhost:3000/api',
    },
  },
})
