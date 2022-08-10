<template lang="pug">
v-container.ma-0.pa-0#crud-container(fluid)
  v-row(v-if='!entityId' no-gutters dense)
    v-col(cols='12')
      v-card
        v-card-title.secondary.text--break-on-word#crud-list-title
          v-row(no-gutters)
            v-col.flex-grow-1
              slot(name='title' :context='context')
                span {{ context.pluralizedEntityName }}
            v-col.flex-grow-0.text-no-wrap
              Create(
                v-if='context.hasActionCreate'
                :createFn="callApi('create')"
                :context='context'
                @created='$refs.Read.$fetch()'
                v-bind='resolvedAttrs'
              )
                template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
                  slot(:name='slot' v-bind='scope' :context='context')
              slot(name='actions.extra' :context='context'): span
        v-card-text
          Read(
            ref='Read'
            :readFn="callApi('read')"
            :updateFn="callApi('update')"
            :deleteFn="callApi('delete')"
            :context='context'
            v-bind='resolvedAttrs'
          )
            template(v-for='(_, slot) of slots' v-slot:[slot]='scope')
              slot(:name='slot' v-bind='scope' :context='context')
          //- Update(
          //-   ref='UpdateItem'
          //-   v-else-if='item'
          //-   :item='item'
          //-   :update-fn="callApi('update')"
          //-   :context='context'
          //-   :maxWidth='resolvedAttrs.maxWidth'
          //- )
          //-   template(v-for='(_, slot) of $scopedSlots' v-slot:[slot]='scope')
          //-     slot(:name='slot' v-bind='scope')
          //- v-progress-circular(v-else indeterminate size='12' width='1')
</template>

<script setup>
import pluralize from 'pluralize'
import Create from './create'
// import Delete from './delete'
import Read from './read'
// import Update from './update'

const { $i18n } = useNuxtApp()
const attrs = useAttrs()
const slots = useSlots()

const props = defineProps({
  entityName: { type: String, required: true },
  entityMale: { type: Boolean, required: false },
  entityId: { type: String, required: false, default: () => undefined },
  keyProperty: { type: String, required: false, default: () => null },
  searchType: {
    type: String,
    enum: ['local', 'remote'],
    required: false,
    default: () => 'local',
  },
  actions: {
    required: false,
    type: Array,
    default: () => ['create', 'read', 'update', 'delete'],
  },
  properties: {
    type: Object,
    required: true,
  },
  getFn: {
    type: Function,
    required: false,
    default: undefined,
  },
  createFn: {
    type: Function,
    required: false,
    default: undefined,
  },
  readFn: {
    type: Function,
    required: false,
    default: undefined,
  },
  updateFn: {
    type: Function,
    required: false,
    default: undefined,
  },
  deleteFn: {
    type: Function,
    required: false,
    default: undefined,
  },
})

const item = ref(null)

const pluralizedEntityName = computed(() => {
  // @see https://github.com/plurals/pluralize/issues/145
  const probablyPluralized = pluralize.plural(props.entityName)
  if (probablyPluralized.endsWith('s')) return probablyPluralized
  return `${probablyPluralized}s`
})

function callApi(operation) {
  const normalizedOperation = {
    get: 'get',
    create: 'create',
    read: 'list',
    update: 'update',
    delete: 'delete',
  }[operation]
  return async (...params) => {
    try {
      // Overridings
      switch (operation) {
        case 'get':
          if (props.getFn) return await props.getFn(...params)
          break
        case 'create':
          if (props.createFn) return await props.createFn(...params)
          break
        case 'read':
          if (props.readFn) return await props.readFn(...params)
          break
        case 'update':
          if (props.updateFn) return await props.updateFn(...params)
          break
        case 'delete':
          if (props.deleteFn) return await props.deleteFn(...params)
      }
      // Standard behaviour
      const api = useApi(useFetch)
      const apiSection = api[pluralizedEntityName.value]
      if (!apiSection)
        throw new Error(
          `Api section not found for "${pluralizedEntityName.value}"`
        )
      const apiMethod = apiSection[normalizedOperation]
      if (!apiMethod)
        throw new Error(
          `Api method not found for "${pluralizedEntityName.value}.${normalizedOperation}"`
        )
      return apiMethod(...params)
    } catch (err) {
      if (err && err.response) {
        if (err.response.status === 401) {
          // this.$noty.error($i18n('errors.unauthorized'), {
          //   timeout: 15000,
          // })
          // console.log($i18n('errors.unauthorized'))
        } else if (err.response.status !== 500) {
          // this.$noty.error(err.response.data.message, {
          //   timeout: 15000,
          // })
          // console.log(err.response.data.message)
        }
      }
      throw err
    }
  }
}

async function fetch() {
  if (props.entityId) {
    item.value = await callApi('get')(props.entityId)
    return this.$refs.UpdateItem && this.$refs.UpdateItem.open()
  } else {
    return this.$refs.Read && this.$refs.Read.$fetch()
  }
}

const context = computed(() => {
  let keyProperty
  if (props.keyProperty) {
    keyProperty = props.properties[props.keyProperty]
    if (!keyProperty)
      throw new Error(`Property not found for key "${props.keyProperty}"`)
    keyProperty = { ...keyProperty, name: props.keyProperty }
  } else {
    const propertyName = Object.keys(props.properties).find(
      (prop) => props.properties[prop].key
    )
    if (!propertyName)
      throw new Error(
        `Key property not found for entity ${props.entityName}`
      )
    keyProperty = { name: propertyName, ...props.properties[propertyName] }
  }
  return {
    entity: props.entityName,
    entityName: $i18n(props.entityName),
    pluralizedEntityName: $i18n(pluralizedEntityName.value),
    entityMale: props.entityMale,
    properties: props.properties,
    keyProperty,
    hasActionCreate: !!props.actions.find((action) => action === 'create'),
    hasActionRead: !!props.actions.find((action) => action === 'read'),
    hasActionUpdate: !!props.actions.find((action) => action === 'update'),
    hasActionDelete: !!props.actions.find((action) => action === 'delete'),
    searchType: props.searchType,
  }
})

const resolvedAttrs = computed(() => {
  const width = attrs.dialogsWidth || attrs['dialogs-width']
  const minWidth = attrs.dialogsMinWidth || attrs['dialogs-min-width']
  const maxWidth = attrs.dialogsMaxWidth || attrs['dialogs-max-width']
  return {
    width,
    minWidth,
    maxWidth,
  }
})
</script>

<style>
.crud-dialog-z-index {
  z-index: 1854 !important;
}

.text--break-on-word {
  white-space: pre-wrap !important;
  word-break: normal !important;
}
</style>
