<template lang="pug">
v-container.fill-height
  v-card(height='100%' elevation='3')
    v-card-title.primary
      slot(name='title') {{ title }}
    v-card-text.pt-3
      slot(name='content')
        slot
</template>

<script setup>
const { title } = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
