<template lang="pug">
CRUD(
  entity-name='user',
  :entity-male='true',
  key-property='id',
  :properties='properties',
  dialogsMaxWidth='900',
  searchType='remote'
)
  template(v-slot:list.summary) LOL
  template(v-slot:list.item.updatedAt='{ item }') {{ formatDate(item.updatedAt) }}
  template(v-slot:list.item.createdAt='{ item }') {{ formatDate(item.createdAt) }}
  //- template(v-slot:list.item.actions.extra='{ item }')
  //-   v-col
  //-     RelationshipDialog(
  //-       entity-name='user',
  //-       relationship-entity-name='role',
  //-       :entity='item',
  //-       :relationship-list='roles',
  //-       :crud-properties='rolesRelationshipCrudProperties',
  //-       :loading='$fetchState.pending',
  //-       icon='mdi-badge-account'
  //-     )
</template>

<script>
import { maxLength, minLength, required, email } from '@vuelidate/validators'
import formatDate from 'date-fns/format'
import CRUD from '@/components/CRUD'
// import RelationshipDialog from '@/components/CRUD/relationship-dialog'

export default defineComponent({
  name: 'UsersCRUD',
  components: { CRUD, /* RelationshipDialog */ },
  data: () => ({
    roles: [],
    properties: {
      id: {
        type: String,
        showInForm: false,
      },
      email: {
        type: String,
        validators: {
          required,
          email,
        },
      },
      username: {
        type: String,
        showInList: true,
        validators: {
          required,
          minLength: minLength(1),
          maxLength: maxLength(15),
        },
      },
      password: {
        type: String,
        password: true,
        showInList: false,
        validators: {
          minLength: minLength(8),
          maxLength: maxLength(200),
        },
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
      picture: String,
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
      description: {
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
  }),
  async fetch() {
    this.roles.splice(0, this.roles.length)
    const roles = (await this.$api.roles.list({ limit: 500 })).data
    roles.forEach((role, index) => {
      this.roles[index] = role
    })
  },
  methods: {
    formatDate(timestamp) {
      if (!timestamp) return timestamp
      return formatDate(new Date(timestamp), 'dd/MM/yyyy HH:mm')
    },
  },
})
</script>
