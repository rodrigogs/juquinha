<template lang="pug">
Dialog(v-bind='attrs' :item='item' :context='context' action='delete')
  template(v-slot:list.items.actions.delete.card-text)
    p.mt-4 {{ $i18n('crud.delete.text', { entityName: context.entityName.toLowerCase() }) }}
    v-text-field#delete-confirm-input(
      :key.sync='itemKey'
      :label='confirmDeleteText'
      :disabled='loading'
      v-model='confirmDelete'
      autocomplete='off'
      autofocus
      color='error'
    )
  template(v-slot:list.items.actions.delete.card-actions)
    v-card-actions
      v-spacer
      v-btn#delete-cancel-btn.warning(@click='dialog = false' small) {{ $i18n('cancel') }}
      v-btn#delete-confirm-btn.error(
        small
        :loading='loading'
        :disabled='confirmDelete.toLowerCase() !== confirmDeleteWord'
        @click='remove'
      ) {{ $i18n('delete') }}
</template>

<script setup>
import { nextTick } from 'vue'
import { v4 as uuid } from 'uuid'

const { $i18n } = useNuxtApp()

const attrs = useAttrs()

const emit = defineEmits()

const props = defineProps({
  deleteFn: { type: Function, required: true },
  item: { type: Object, required: true },
  context: { type: Object, required: true },
})

const dialog = ref(null)
const loading = ref(false)
const confirmDelete = ref('')
const itemKey = ref(uuid())

const confirmDeleteWord = computed(() => {
  return $i18n('delete').toLowerCase()
})

const confirmDeleteText = computed(() => {
  return this.$i18n('crud.delete.hint', { confirmDeleteWord: this.confirmDeleteWord })
})

watch(dialog, () => {
  nextTick(() => {
    itemKey.value = uuid()
    confirmDelete.value = ''
  })
})

async function remove() {
  try {
    loading.value = true
    const entity = await props.deleteFn(item.value[props.context.keyProperty.name])
    // this.$noty.success(this.$i18n('crud.delete.success', { entityName: this.context.entityName.toString() }))
    emit('deleted', entity)
    dialog.value = false
  } catch (err) {
    emit('delete-error', err)
    // this.$noty.error(this.$i18n('crud.delete.error', { entityName: this.context.entityName.toString() }))
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
