<template lang="pug">
CRUD(
  entity-name='role',
  :entity-male='false',
  :properties='properties',
  dialogsMaxWidth='900',
  searchType='remote'
)
  template(v-slot:list.summary)
    | Os perfis controlam o acesso dos&nbsp;
    nuxt-link(to='/users', target='_blank') usuários
    | &nbsp;através das&nbsp;
    nuxt-link(to='/permissions', target='_blank') permissões
    | .
  template(v-slot:list.item.updatedAt='{ item }') {{ formatDate(item.updatedAt) }}
  template(v-slot:list.item.createdAt='{ item }') {{ formatDate(item.createdAt) }}
  template(v-slot:list.item.actions.extra='{ item }')
    v-col
      RelationshipDialog(
        entity-name='role',
        relationship-entity-name='user',
        :entity='item',
        :relationship-list='users',
        :crud-properties='usersRelationshipCrudProperties',
        :loading='$fetchState.pending',
        icon='mdi-account-details'
      )
    v-col
      RelationshipDialog(
        entity-name='role',
        relationship-entity-name='permission',
        :entity='item',
        :relationship-list='permissions',
        :crud-properties='permissionsRelationshipCrudProperties',
        :loading='$fetchState.pending',
        icon='mdi-security'
      )
</template>

<script>
import Vue from 'vue'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import formatDate from 'date-fns/format'
import CRUD from '@/components/CRUD'
import RelationshipDialog from '@/components/common/dialogs/RelationshipDialog'

export default {
  name: 'RolesCRUD',
  components: { CRUD, RelationshipDialog },
  data: () => ({
    users: [],
    permissions: [],
    properties: {
      id: {
        type: String,
        showInForm: false,
        key: true,
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
          maxLength: maxLength(300),
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
    usersRelationshipCrudProperties: {
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
      email: {
        type: String,
        showInList: true,
        showInForm: false,
      },
      user: {
        type: String,
        showInList: false,
        showInForm: true,
        validators: {
          required,
        },
      },
    },
    permissionsRelationshipCrudProperties: {
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
      description: {
        type: String,
        showInList: true,
        showInForm: false,
      },
      permission: {
        type: String,
        showInList: false,
        showInForm: true,
        validators: {
          required,
        },
      },
    },
  }),
  async fetch() {
    this.users.splice(0, this.users.length)
    const users = (await this.$api.users.list({ limit: 500 })).data
    users.forEach((user, index) => {
      Vue.set(this.users, index, user)
    })
    this.permissions.splice(0, this.permissions.length)
    const permissions = (await this.$api.permissions.list({ limit: 500 })).data
    permissions.forEach((permission, index) => {
      Vue.set(this.permissions, index, permission)
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
