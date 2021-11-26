<template lang="pug">
CRUD(
  entity-name='permission',
  :entity-male='false',
  key-property='id',
  :properties='properties',
  dialogsMaxWidth='900',
  searchType='remote'
)
  template(v-slot:form.path='{ form, property, action, errors }')
    v-text-field(
      v-model='form[property.name]',
      :label='property.title',
      :clearable='action !== "show"',
      :read-only='action === "show"',
      :error-messages.sync='errors',
      :hint='property.hint',
      autocomplete='off'
    )
  template(v-slot:form.pathTest='{ form, property, action, errors }')
    v-textarea(
      v-model='form[property.name]',
      :label='property.title',
      :clearable='action !== "show"',
      :read-only='action === "show"',
      :error-messages.sync='errors',
      :hint='property.hint',
      autocomplete='off'
    )

  template(v-slot:list.summary)
    | As permissões controlam o acesso dos&nbsp;
    nuxt-link(to='/roles', target='_blank') perfis
    | .
  template(v-slot:list.item.updatedAt='{ item }') {{ formatDate(item.updatedAt) }}
  template(v-slot:list.item.createdAt='{ item }') {{ formatDate(item.createdAt) }}
  template(v-slot:list.item.actions.extra='{ item }')
    v-col
      RelationshipDialog(
        entity-name='permission',
        relationship-entity-name='role',
        :entity='item',
        :relationship-list='roles',
        :crud-properties='rolesRelationshipCrudProperties',
        :loading='$fetchState.pending',
        icon='mdi-badge-account-horizontal-outline'
      )
</template>

<script>
import Vue from 'vue'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { regex } from 'lib/common/validations'
import formatDate from 'date-fns/format'
import CRUD from '@/components/CRUD'
import RelationshipDialog from '@/components/common/dialogs/RelationshipDialog'

export default {
  name: 'PermissionsCRUD',
  components: { CRUD, RelationshipDialog },
  data() {
    return {
      roles: [],
      properties: {
        id: {
          type: String,
          showInForm: false,
        },
        name: {
          type: String,
          showInList: true,
          validators: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(100),
          },
        },
        description: {
          type: String,
          showInList: true,
          validators: {
            minLength: minLength(3),
            maxLength: maxLength(100),
          },
        },
        type: {
          type: String,
          showInList: true,
          showInForm: true,
          enum: ['ALLOW', 'DENY'],
          validators: {
            required,
          },
        },
        method: {
          type: String,
          showInList: true,
          showInForm: true,
          enum: ['ALL', 'GET', 'POST', 'PUT', 'DELETE'],
          validators: {
            required,
          },
        },
        path: {
          type: String,
          showInList: true,
          showInForm: true,
          hint: this.$i18n('permission.crud.form.path.hint'),
          validators: {
            required,
            regex,
          },
        },
        pathTest: {
          type: String,
          showInForm: true,
          transient: true,
          hint: this.$i18n('permission.crud.form.pathTest.hint'),
          validators: {
            regexMatch(val) {
              try {
                const regex = new RegExp(this.form.path)
                return regex.test(val)
              } catch (err) {
                return false
              }
            },
          },
        },
        createdAt: {
          type: String,
          showInList: true,
          showInForm: false,
        },
        updatedAt: {
          type: String,
          showInList: true,
          showInForm: false,
        },
      },
      rolesRelationshipCrudProperties: {
        id: {
          type: String,
          showInForm: false,
          key: true,
        },
        name: {
          type: String,
          showInList: true,
          showInForm: false,
        },
        role: {
          type: String,
          showInList: false,
          showInForm: true,
          validators: {
            required,
          },
        },
      },
    }
  },
  async fetch() {
    this.roles.splice(0, this.roles.length)
    const roles = (await this.$api.roles.list({ limit: 500 })).data
    roles.forEach((role, index) => {
      Vue.set(this.roles, index, role)
    })
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return timestamp
      return formatDate(new Date(timestamp), 'dd/MM/yyyy HH:mm')
    },
  },
}
</script>
