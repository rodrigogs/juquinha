<template lang="pug">
v-dialog(
  v-model='dialog',
  transition='dialog-bottom-transition',
  :key='dialog',
  max-width='600'
)
  template(v-slot:activator='{ on, attrs }')
    v-tooltip(bottom)
      template(v-slot:activator='tooltipScope')
        v-badge(color='transparent', offset-x='15', offset-y='15', avatar)
          template(v-slot:badge)
            v-avatar.relationships-counter(
              v-if='relationshipsCount > 0',
              color='primary',
              size='12',
              max-width='12',
              max-height='12',
              @click='dialog = true'
            )
              span {{ relationshipsCount }}
          v-btn(
            v-on='tooltipScope.on',
            :icon='!!$attrs.icon',
            @click='dialog = true'
          )
            v-icon(color='secondary') {{ $attrs.icon }}
      span {{ $i18n(`${entityName}.manage${pluralizedRelationshipFirstLetterUpperCase}.tooltip`) }}
  CRUD(
    :entityName='computedEntityName',
    :actions='["create", "delete"]',
    :properties='crudProperties',
    :createFn='createFn',
    :readFn='readFn',
    :deleteFn='deleteFn',
    dialogs-max-width='500'
  )
    template(v-slot:title='{ context }')
      span.white--text {{ context.pluralizedEntityName }} - {{ entity.name }}
    template(v-slot:actions.extra='{ context }')
      v-tooltip(bottom)
        template(v-slot:activator='{ on: closeOn, attrs: closeAttrs }')
          v-btn.white--text.ml-2(
            icon,
            @click='dialog = false',
            v-bind='closeAttrs',
            v-on='closeOn'
          )
            v-icon mdi-close
        span {{ $i18n("close") }}
    template(
      v-slot:[`form.${relationshipEntityName}`]='{ form, property, action, errors }'
    )
      v-combobox(
        v-model='form[property.name]',
        :label='property.title',
        :clearable='action !== "show"',
        :read-only='action === "show"',
        :error-messages.sync='errors',
        :items='getAvailableRelationships()',
        :item-text='relationshipDisplayProperty',
        :item-value='relationshipIdProperty',
        autocomplete='off'
      )
</template>

<script>
import Vue from 'vue'
import { pluralize , capitalizeFirstLetter, kebabToCamel } from 'lib/common/helpers/string'
import CRUD from '@/components/CRUD'

export default {
  name: 'RelationshipDialog',
  components: { CRUD },
  props: {
    entityName: {
      type: String,
      required: true,
    },
    relationshipEntityName: {
      type: String,
      required: true,
    },
    entity: {
      type: Object,
      required: true,
    },
    relationshipList: {
      type: Array,
      required: true,
    },
    crudProperties: {
      type: Object,
      required: true,
    },
    entityIdProperty: {
      type: String,
      required: false,
      default: () => 'id',
    },
    relationshipIdProperty: {
      type: String,
      required: false,
      default: () => 'id',
    },
    relationshipDisplayProperty: {
      type: String,
      required: false,
      default: () => 'name',
    },
  },
  data() {
    return {
      dialog: false,
      usingCache: true,
      cachedRelationships: [],
      relationshipsResponse: null,
    }
  },
  async fetch() {
    const response = await this.api.list(this.entity[this.entityIdProperty], {
      limit: 500,
    })
    Vue.set(this, 'usingCache', true)
    Vue.set(this, 'relationshipsResponse', response)
  },
  computed: {
    api() {
      return this.$api[this.pluralizedEntityName][
        this.pluralizedRelationshipEntityName
      ]
    },
    computedEntityName() {
      return `${this.entityName}${capitalizeFirstLetter(
        kebabToCamel(this.relationshipEntityName)
      )}`
    },
    relationshipsCount() {
      if (!this.relationshipsResponse) return 0
      return this.relationshipsResponse.data.length
    },
    pluralizedEntityName() {
      return pluralize(this.entityName)
    },
    pluralizedRelationshipEntityName() {
      return pluralize(this.relationshipEntityName)
    },
    pluralizedRelationshipFirstLetterUpperCase() {
      return capitalizeFirstLetter(kebabToCamel(this.pluralizedRelationshipEntityName))
    },
  },
  methods: {
    getAvailableRelationships() {
      const { relationshipList, cachedRelationships } = this
      return relationshipList.filter(
        (relationship) =>
          !cachedRelationships.find(
            ({ [this.relationshipIdProperty]: id }) =>
              relationship[this.relationshipIdProperty] === id
          )
      )
    },
    /**
     * @param {Object} createForm
     * @return {Promise<Object>} Axios response
     */
    async createFn(form) {
      const relationship = form[this.relationshipEntityName]
      const response = await this.api.create(
        this.entity[this.entityIdProperty],
        relationship[this.relationshipIdProperty]
      )
      await this.$fetch()
      return response
    },
    /**
     * @param {Object} requestParams
     * @return {Promise<Object>} Axios response
     */
    async readFn({ lastKey, limit }) {
      if (this.usingCache) {
        this.usingCache = false
        Vue.set(this, 'cachedRelationships', this.relationshipsResponse.data)
        return this.relationshipsResponse
      }
      const response = await this.api.list(this.entity[this.entityIdProperty], {
        lastKey,
        limit,
      })
      Vue.set(this, 'cachedRelationships', response.data)
      return response
    },
    /**
     * @param {String} relationshipId
     * @return {Promise<Object>} Axios response
     */
    async deleteFn(relationshipId) {
      const response = await this.api.delete(
        this.entity[this.entityIdProperty],
        relationshipId
      )
      await this.$fetch()
      return response
    },
  },
}
</script>

<style scoped>
.relationships-counter {
  top: 6px;
  right: 5px;
}

.relationships-counter span {
  font-size: 8.5px;
  font-weight: bold;
}
</style>
