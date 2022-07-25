<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='dialog'
  transition='dialog-bottom-transition'
  v-bind='$attrs'
)
  template(v-slot:activator='scope')
    slot(name='list.items.actions.create.activator' :context='context' v-bind='scope')
      v-tooltip(bottom)
        template(v-slot:activator='tooltipScope')
          v-btn(
            v-if='context.hasActionCreate'
            v-on='tooltipScope.on'
            v-bind='tooltipScope.attrs'
            @click.prevent='scope.on.click'
            small
          ).primary {{ $i18n('create') }}
            v-icon(icon='mdi-plus')
  //-       span {{ $i18n('create') }} {{ context.entityName.toLowerCase() }}
  //- v-card
  //-   v-card-title.primary
  //-     v-row(no-gutters)
  //-       slot(name='create.title' :context='context')
  //-         v-col.flex-grow-1
  //-           slot(name='title' :context='context')
  //-             span.text--break-on-word {{ $i18n('create') }} {{ context.entityName.toLowerCase() }}
  //-         v-col.flex-grow-0.text-no-wrap
  //-           slot(name='create.actions.extra' :context='context'): span
  //-           v-tooltip(bottom)
  //-             template(v-slot:activator='{ on: closeOn, attrs: closeAttrs }')
  //-               v-btn(icon @click='dialog = false' v-bind='closeAttrs' v-on='closeOn'): v-icon mdi-close
  //-             span {{ $i18n('close') }}
  //-   v-card-text
  //-     Form(
  //-       :key='itemKey'
  //-       v-model='form'
  //-       :context='context'
  //-       :loading='loading'
  //-       action='create'
  //-       @submit='create'
  //-       @cancel='cancel'
  //-     )
  //-       template(v-for='(_, slot) of $scopedSlots' v-slot:[slot]='scope')
  //-         slot(:name='slot' v-bind='scope')
</template>

<script>
import { v4 as uuid } from 'uuid'
import Form from './_form'

export default {
  name: 'Create',
  // components: {
  //   Form,
  // },
  // props: {
  //   createFn: { type: Function, required: true },
  //   context: { type: Object, required: true },
  // },
  // data: () => ({
  //   dialog: null,
  //   loading: false,
  //   form: {},
  //   itemKey: uuid(),
  // }),
  // watch: {
  //   dialog() {
  //     Vue.nextTick(() => {
  //       Vue.set(this, 'itemKey', uuid())
  //       Vue.set(this, 'form', {})
  //     })
  //   },
  // },
  // methods: {
  //   async create() {
  //     try {
  //       this.loading = true
  //       const entity = await this.createFn(this.form)
  //       this.$noty.success(this.$i18n('crud.create.success', { entityName: this.context.entityName.toLowerCase() }))
  //       this.$emit('created', entity)
  //       this.dialog = false
  //     } catch (err) {
  //       this.$emit('create-error', err)
  //       this.$noty.error(this.$i18n('crud.create.error', { entityName: this.context.entityName.toLowerCase() }))
  //       // eslint-disable-next-line no-console
  //       console.error(err)
  //     } finally {
  //       this.loading = false
  //     }
  //   },
  //   cancel() {
  //     this.dialog = false
  //   },
  // },
}
</script>
