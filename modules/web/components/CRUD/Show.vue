<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='dialog'
  transition='dialog-bottom-transition'
  v-bind='attrs'
)
  template(v-slot:activator='{ props: dialogProps }')
    slot(
      name='list.items.actions.show.activator'
      :context='context'
      :item='item'
      v-bind='dialogProps'
    )
      v-tooltip(bottom)
        template(v-slot:activator='{ props: tooltipProps }')
          v-icon(v-bind='{ ...dialogProps, ...tooltipProps }' color='info') mdi-eye
        span {{ $i18n('show') }}
  //-
  //- v-card
  //-   v-card-title.primary
  //-     v-row(no-gutters)
  //-       slot(name='show.title' :context='context')
  //-         v-col.flex-grow-1
  //-           slot(name='title' :context='context')
  //-             span {{ $i18n('show') }} {{ context.entityName.toLowerCase() }}
  //-         v-col.flex-grow-0.text-no-wrap
  //-           slot(name='show.actions.extra' :context='context'): span
  //-           v-tooltip(bottom)
  //-             template(v-slot:activator='{ on: closeOn, attrs: closeAttrs }')
  //-               v-btn(icon @click='dialog = false' v-bind='closeAttrs' v-on='closeOn')
  //-                 v-icon mdi-close
  //-             span {{ $i18n('close') }}
  //-   v-card-text
  //-     Form(
  //-       :value='item'
  //-       :context='context'
  //-       read-only
  //-       action='show'
  //-     )
  //-       template(v-for="(_, slot) of slots" v-slot:[slot]="scope")
  //-         slot(:name="slot" v-bind="scope")
</template>

<script setup>
// import Form from './_form'

const { $i18n } = useNuxtApp()
const attrs = useAttrs()
const slots = useSlots()

const dialog = ref(null)
</script>
