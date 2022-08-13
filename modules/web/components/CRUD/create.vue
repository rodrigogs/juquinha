<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='dialog'
  transition='dialog-bottom-transition'
  v-bind='attrs'
)
  template(v-slot:activator='{ props: dialogProps }')
    // TODO Add documentation
    slot(name='list.items.actions.create.activator' :context='context' v-bind='dialogProps')
      v-tooltip(bottom)
        template(v-slot:activator='{ props: tooltipProps }')
          v-btn(
            v-if='context.hasActionCreate'
            v-bind='{ ...dialogProps, ...tooltipProps }'
            small
          ).primary {{ $i18n('create') }}
            v-icon(icon='mdi-plus')
        span {{ $i18n('create') }} {{ context.entityName.toLowerCase() }}
  v-card
    v-card-title.primary
      v-row(no-gutters)
        // TODO Add documentation
        slot(name='create.title' :context='context')
          v-col.flex-grow-1
            // TODO Add documentation
            slot(name='title' :context='context')
              span.text--break-on-word {{ $i18n('create') }} {{ context.entityName.toLowerCase() }}
          v-col.flex-grow-0.text-no-wrap
            // TODO Add documentation
            slot(name='create.actions.extra' :context='context'): span
            v-tooltip(bottom)
              template(v-slot:activator='{ props }')
                v-btn(icon @click='dialog = false' v-bind='props')
                  v-icon(icon='mdi-close')
              span {{ $i18n('close') }}
    v-card-text
      Form(
        :key='itemKey'
        v-model='form'
        :context='context'
        :loading='loading'
        action='create'
        @submit='create'
        @cancel='cancel'
      )
        template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
          slot(:name='slot' v-bind='scope')
</template>

<script setup>
import { nextTick } from 'vue'
import { v4 as uuid } from 'uuid'
import Form from './_form'

const slots = useSlots()
const attrs = useAttrs()

const emit = defineEmits()
const props = defineProps({
  createFn: { type: Function, required: true },
  context: { type: Object, required: true },
})

const dialog = ref(null)
const loading = ref(false)
const form = ref({})
const itemKey = ref(uuid())

watch(dialog, () => {
  nextTick(() => {
    itemKey.value = uuid()
    form.value = {}
  })
})

async function create() {
  try {
    loading.value = true
    entity.value = await this.createFn(this.form)
    // this.$noty.success(this.$i18n('crud.create.success', { entityName: this.context.entityName.toLowerCase() }))
    emit('created', entity)
    dialog.value = false
  } catch (err) {
    emit('create-error', err)
    // this.$noty.error(this.$i18n('crud.create.error', { entityName: this.context.entityName.toLowerCase() }))
    // eslint-disable-next-line no-console
    console.error(err)
  } finally {
    loading.value = false
  }
}

function cancel() {
  dialog.value = false
}
</script>
