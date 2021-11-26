<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='dialog'
  transition='dialog-bottom-transition'
  v-bind='$attrs'
)
  template(v-slot:activator='scope')
    slot(
      name='list.items.actions.update.activator'
      :context='context'
      :item='item'
      v-bind='scope'
    )
      v-tooltip(bottom)
        template(v-slot:activator='tooltipScope')
          v-btn(
            icon
            v-on='tooltipScope.on'
            v-bind='tooltipScope.attrs'
            @click.prevent='scope.on.click'
          )
            v-icon(color='warning') mdi-pencil
        span {{ $i18n('update') }}
  v-card
    v-card-title.warning.darken-2
      v-row(no-gutters)
        slot(name='update.title' :context='context')
          v-col.flex-grow-1
            slot(name='title' :context='context')
              span.white--text {{ $i18n('update') }} {{ context.entityName.toLowerCase() }}
          v-col.flex-grow-0.text-no-wrap
            slot(name='update.actions.extra' :context='context'): span
            v-tooltip(bottom)
              template(v-slot:activator='{ on: closeOn, attrs: closeAttrs }')
                v-btn.white--text(icon @click='dialog = false' v-bind='closeAttrs' v-on='closeOn')
                  v-icon mdi-close
              span {{ $i18n('close') }}
    v-card-text
      Form(
        :key.sync='itemKey'
        v-model='form'
        :context='context'
        :loading='loading'
        action='update'
        @submit='update'
        @cancel='dialog = false'
      )
        template(v-for='(_, slot) of $scopedSlots' v-slot:[slot]='scope')
          slot(:name='slot' v-bind='scope')
</template>

<script>
import Vue from 'vue'
import { v4 as uuid } from 'uuid'
import * as _ from 'lodash'
import Form from './_form'

export default {
  name: 'Update',
  components: {
    Form,
  },
  props: {
    updateFn: { type: Function, required: true },
    item: { type: Object, required: true },
    context: { type: Object, required: true },
  },
  data() {
    return {
      dialog: null,
      loading: false,
      form: Object.keys(this.context.properties).reduce((form, property) => {
        _.set(form, property, _.get(this.item, property))
        return form
      }, {}),
      itemKey: uuid(),
    }
  },
  watch: {
    dialog() {
      Vue.nextTick(() => {
        Vue.set(this, 'itemKey', uuid())
        Object.keys(this.item).forEach((key) => {
          Vue.set(this.form, key, this.item[key])
        })
      })
    },
  },
  methods: {
    open() {
      this.dialog = true
    },
    async update() {
      try {
        this.loading = true
        const entity = await this.updateFn(
          this.form[this.context.keyProperty.name],
          this.form
        )
        this.$noty.success(this.$i18n('crud.update.success', { entityName: this.context.entityName.toLowerCase() }))
        this.$emit('updated', entity)
        this.dialog = false
      } catch (err) {
        this.$emit('update-error', err)
        this.$noty.error(this.$i18n('crud.update.error', { entityName: this.context.entityName.toLowerCase() }))
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
