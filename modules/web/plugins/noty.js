import Vue from 'vue'
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

Vue.use(VueNoty, {
  timeout: 2500,
  theme: 'semanticui',
  layout: 'bottomRight',
  progressBar: true,
})
