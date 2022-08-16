<template lang="pug">
Dialog(v-model='dialog' v-bind='attrs' :item='item' :context='context' action='show')
  Form(
    :value='item'
    :context='context'
    read-only
    action='show'
  )
    template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
      slot(:name='slot' v-bind='scope')
</template>

<script setup>
import Dialog from './_dialog'
import Form from './_form'

const attrs = useAttrs()
const slots = useSlots()

const dialog = ref(null)

defineProps({
  context: {
    type: Object,
    required: true
  },
  item: {
    type: Object,
    required: true
  }
})
</script>
