<template lang="pug">
Dialog(v-model='dialog' v-bind='attrs' :item='item' :context='context' action='update')
  Form(
    :value='formData'
    :key.sync='itemKey'
    :context='context'
    :loading='loading'
    action='update'
    @submit='update'
    @cancel='dialog = false'
  )
    template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
      slot(:name='slot' v-bind='scope')
</template>

<script setup>
import { nextTick } from 'vue'
import { v4 as uuid } from 'uuid'
import * as _ from 'lodash'
import Form from './_form'
import Dialog from './_dialog'

const slots = useSlots()
const attrs = useAttrs()

const emit = defineEmits()

const props = defineProps({
  updateFn: { type: Function, required: true },
  item: { type: Object, required: true },
  context: { type: Object, required: true },
})

const dialog = ref(null)
const loading = ref(false)

const formData = ref(Object.keys(props.context.properties).reduce((form, property) => {
  _.set(form, property, _.get(props.item, property))
  return form
}, {}))

const itemKey = ref(uuid())

watch(dialog, () => {
  nextTick(() => {
    itemKey.value = uuid()
    formData.value = Object.keys(props.item)
      .reduce((form, key) => {
        form[key] = props.item[key]
        return form
      }, {})
  })
})

async function update() {
  try {
    loading.value = true
    const entity = await props.updateFn(
      formData.value[props.context.keyProperty.name],
      formData.value
    )
    // this.$noty.success(this.$i18n('crud.update.success', { entityName: this.context.entityName.toLowerCase() }))
    emit('updated', entity)
    dialog.value = false
  } catch (err) {
    emit('update-error', err)
    // this.$noty.error(this.$i18n('crud.update.error', { entityName: this.context.entityName.toLowerCase() }))
    // eslint-disable-next-line no-console
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
