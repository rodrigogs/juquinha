<template lang="pug">
v-dialog.crud-dialog-z-index(
  v-model='value'
  transition='dialog-bottom-transition'
  v-bind='attrs'
  :color='actionConfig.color'
)
  template(v-slot:activator='{ props: dialogProps }')
    // TODO Add documentation
    slot(
      name=`list.items.actions.${action}.activator`
      :context='context'
      v-bind='dialogProps'
    )
      v-tooltip(bottom)
        template(v-slot:activator='{ props: tooltipProps }')
          v-icon(v-bind='{ ...dialogProps, ...tooltipProps }' :color='actionConfig.color' :icon='actionConfig.icon')
        span {{ actionConfig.title }}

  // TODO Add documentation
  slot(name=`list.items.actions.${action}.card` :context='context' :item='item')
    v-card
      // TODO Add documentation
      slot(name=`list.items.actions.${action}.card-title` :context='context' :item='item')
        v-card-title.primary
          v-row(no-gutters)
            // TODO Add documentation
            slot(name=`${action}.title` :context='context')
              v-col.flex-grow-1
                // TODO Add documentation
                slot(name='title' :context='context')
                  span {{ $i18n(action) }} {{ context.entityName.toLowerCase() }}
              v-col.flex-grow-0.text-no-wrap
                // TODO Add documentation
                slot(name=`${action}.actions.extra` :context='context'): span
                v-tooltip(bottom)
                  template(v-slot:activator='{ props }')
                    v-icon(@click='dialog = false' v-bind='props' icon='mdi-close')
                  span {{ $i18n('close') }}
      // TODO Add documentation
      slot(name=`list.items.actions.${action}.card-text` :context='context' :item='item')
        v-card-text
          slot
      // TODO Add documentation
      slot(name=`list.items.actions.${action}.card-actions` :context='context' :item='item')
        span
</template>

<script setup>
const { $i18n } = useNuxtApp()

const attrs = useAttrs()

const dialog = ref(null)

const props = defineProps({
  value: { type: Boolean, required: true },
  action: { type: String, required: true, enum: ['show', 'create', 'update'] },
  context: {
    type: Object,
    required: true
  },
  item: {
    type: Object,
    required: false
  }
})

const actionConfigs = {
  create: {
    icon: 'mdi-plus',
    color: 'primary'
  },
  show: {
    icon: 'mdi-eye',
    color: 'info'
  },
  update: {
    icon: 'mdi-pencil',
    color: 'secondary'
  },
  delete: {
    icon: 'mdi-delete',
    color: 'error'
  },
}

const actionConfig = computed(() => {
  const action = actionConfigs[props.action]
  return {
    title: `${$i18n(props.action)} ${props.context.entityName.toLowerCase()}`,
    icon: action.icon,
    color: action.color
  }
})
</script>
