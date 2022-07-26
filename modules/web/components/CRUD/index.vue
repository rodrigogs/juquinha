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
                //- template(v-for='(_, slot) of $scopedSlots' v-slot:[slot]='scope')
                  slot(:name='slot' v-bind='scope' :context='context')
              //- slot(name='actions.extra' :context='context'): span
        v-card-text
          //- Read(
          //-   ref='Read'
          //-   :readFn="callApi('read')"
          //-   :updateFn="callApi('update')"
          //-   :deleteFn="callApi('delete')"
          //-   :context='context'
          //-   v-bind='resolvedAttrs'
          //- )
          //-   template(v-for='(_, slot) of $scopedSlots' v-slot:[slot]='scope')
          //-     slot(:name='slot' v-bind='scope' :context='context')
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

<script>
import pluralize from 'pluralize'
import Create from './create'
// import Delete from './delete'
// import Read from './read'
// import Update from './update'

/**
 * slots:
 * form.<property.name>
 * item.<property.name>
 */
export default {
  name: 'CRUD',
  components: {
    Create,
  //   Delete,
  //   Read,
  //   Update,
  },
  props: {
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
  },
  data: () => ({
    item: null,
  }),
  async fetch() {
    if (this.entityId) {
      this.item = await this.callApi('get')(this.entityId)
      return this.$refs.UpdateItem && this.$refs.UpdateItem.open()
    } else {
      return this.$refs.Read && this.$refs.Read.$fetch()
    }
  },
  computed: {
    pluralizedEntityName() {
      // @see https://github.com/plurals/pluralize/issues/145
      const probablyPluralized = pluralize.plural(this.entityName)
      if (probablyPluralized.endsWith('s')) return probablyPluralized
      return `${probablyPluralized}s`
    },
    context() {
      let keyProperty
      if (this.keyProperty) {
        keyProperty = this.properties[this.keyProperty]
        if (!keyProperty)
          throw new Error(`Property not found for key "${this.keyProperty}"`)
        keyProperty = { ...keyProperty, name: this.keyProperty }
      } else {
        const propertyName = Object.keys(this.properties).find(
          (prop) => this.properties[prop].key
        )
        if (!propertyName)
          throw new Error(
            `Key property not found for entity ${this.entityName}`
          )
        keyProperty = { name: propertyName, ...this.properties[propertyName] }
      }
      const entityName = this.$i18n(this.entityName)
      const pluralizedEntityName = this.$i18n(this.pluralizedEntityName)
      return {
        entity: this.entityName,
        entityName,
        entityMale: this.entityMale,
        pluralizedEntity: this.pluralizedEntityName,
        pluralizedEntityName,
        properties: this.properties,
        keyProperty,
        hasActionCreate: !!this.actions.find((action) => action === 'create'),
        hasActionRead: !!this.actions.find((action) => action === 'read'),
        hasActionUpdate: !!this.actions.find((action) => action === 'update'),
        hasActionDelete: !!this.actions.find((action) => action === 'delete'),
        searchType: this.searchType,
      }
    },
    resolvedAttrs() {
      const attrs = this.$attrs
      const width = attrs.dialogsWidth || attrs['dialogs-width']
      const minWidth = attrs.dialogsMinWidth || attrs['dialogs-min-width']
      const maxWidth = attrs.dialogsMaxWidth || attrs['dialogs-max-width']
      return {
        width,
        minWidth,
        maxWidth,
      }
    },
  },
  methods: {
    callApi(operation) {
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
              if (this.getFn) return await this.getFn(...params)
              break
            case 'create':
              if (this.createFn) return await this.createFn(...params)
              break
            case 'read':
              if (this.readFn) return await this.readFn(...params)
              break
            case 'update':
              if (this.updateFn) return await this.updateFn(...params)
              break
            case 'delete':
              if (this.deleteFn) return await this.deleteFn(...params)
          }
          // Standard behaviour
          const apiSection = this.$api[this.pluralizedEntityName]
          if (!apiSection)
            throw new Error(
              `Api section not found for "${this.pluralizedEntityName}"`
            )
          const apiMethod = apiSection[normalizedOperation]
          if (!apiMethod)
            throw new Error(
              `Api method not found for "${this.pluralizedEntityName}.${normalizedOperation}"`
            )
          return await apiMethod(...params)
        } catch (err) {
          if (err && err.response) {
            if (err.response.status === 401) {
              this.$noty.error(this.$i18n('errors.unauthorized'), {
                timeout: 15000,
              })
            } else if (err.response.status !== 500) {
              this.$noty.error(err.response.data.message, {
                timeout: 15000,
              })
            }
          }
          throw err
        }
      }
    },
  },
}
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
