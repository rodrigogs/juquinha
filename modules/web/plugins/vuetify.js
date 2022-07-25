import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'

const vuetify = createVuetify({
  directives,
  components,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#fafafa',
          primary: '#7caec9',
          secondary: '#ff9e80',
          error: '#f44336',
          info: '#2196f3',
          success: '#4caf50',
          warning: '#ffeb3b',
          surface: '#fafafa',
        },
      }
    }
  },
})

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vuetify)
})
