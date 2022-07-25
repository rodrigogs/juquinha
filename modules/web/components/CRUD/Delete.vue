<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='dialog'
  transition='dialog-bottom-transition'
  width='360'
)
  template(v-slot:activator='scope')
    slot(
      name='list.items.actions.delete.activator'
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
            v-icon(color='error') mdi-delete
        span {{ $i18n('delete') }}
  v-card
    v-card-title.error.lighten-1
      v-row(no-gutters)
        slot(name='delete.title' :context='context')
          v-col.text--break-on-word.flex-grow-1
            slot(name='title' :context='context')
              span {{ $i18n('delete') }} {{ context.entityName.toLowerCase() }}
          v-col.flex-grow-0.text-no-wrap
            slot(name='delete.actions.extra' :context='context'): span
            v-tooltip(bottom)
              template(v-slot:activator='{ on: closeOn, attrs: closeAttrs }')
                v-btn(
                  icon
                  @click='dialog = false'
                  v-bind='closeAttrs'
                  v-on='closeOn'
                ): v-icon mdi-close
              span {{ $i18n('close') }}
    v-card-text
      p.mt-4 {{ $i18n('crud.delete.text', { entityName: context.entityName.toLowerCase() }) }}
      v-text-field#delete-confirm-input(
        :key.sync='itemKey'
        :label="confirmDeleteText"
        :disabled="loading"
        v-model='confirmDelete'
        autocomplete='off'
        autofocus
        color='error'
      )
    v-card-actions
      v-spacer
      v-btn#delete-cancel-btn.warning(@click='dialog = false' small) {{ $i18n('cancel') }}
      v-btn#delete-confirm-btn.error(
        small
        :loading='loading'
        :disabled="confirmDelete.toLowerCase() !== confirmDeleteWord"
        @click='remove'
      ) {{ $i18n('delete') }}
</template>

<script>
import Vue from 'vue'
import { v4 as uuid } from 'uuid'

export default {
  name: 'Delete',
  props: {
    deleteFn: { type: Function, required: true },
    item: { type: Object, required: true },
    context: { type: Object, required: true },
  },
  data: () => ({
    dialog: null,
    loading: false,
    confirmDelete: '',
    itemKey: uuid(),
  }),
  computed: {
    confirmDeleteWord() {
      return this.$i18n('delete').toLowerCase()
    },
    confirmDeleteText() {
      return this.$i18n('crud.delete.hint', { confirmDeleteWord: this.confirmDeleteWord })
    }
  },
  watch: {
    dialog() {
      Vue.nextTick(() => {
        Vue.set(this, 'itemKey', uuid())
        Vue.set(this, 'confirmDelete', '')
      })
    },
  },
  methods: {
    async remove() {
      try {
        this.loading = true
        const entity = await this.deleteFn(
          this.item[this.context.keyProperty.name]
        )
        this.$noty.success(this.$i18n('crud.delete.success', { entityName: this.context.entityName.toString() }))
        this.$emit('deleted', entity)
        this.dialog = false
      } catch (err) {
        this.$emit('delete-error', err)
        this.$noty.error(this.$i18n('crud.delete.error', { entityName: this.context.entityName.toString() }))
        // eslint-disable-next-line no-console
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    cancel() {
      this.dialog = false
    },
  },
}
</script>
