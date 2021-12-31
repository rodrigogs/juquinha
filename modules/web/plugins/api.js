const apiFactory = (axios) => ({
  healthCheck: () => axios.$get('/'),
  users: {
    get: (userId) => axios.$get(`/users/id/${userId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/users', { params: { filter, lastKey, limit } }),
    create: (user) => axios.$post('/users', user),
    update: (id, updatedUser) => axios.$put(`/users/${id}`, updatedUser),
    delete: (id) => axios.$delete(`/users/${id}`),
    roles: {
      list: (userId, { lastKey, limit = 10 }) =>
        axios.$get(`/users/${userId}/roles`, {
          params: { lastKey, limit },
        }),
      create: (userId, roleId) =>
        axios.$post(`/users/${userId}/roles`, { roleId }),
      delete: (userId, roleId) =>
        axios.$delete(`/users/${userId}/roles/${roleId}`),
    },
  },
  roles: {
    get: (roleId) => axios.$get(`/roles/${roleId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/roles', { params: { filter, lastKey, limit } }),
    create: (role) => axios.$post('/roles', role),
    update: (id, updatedRole) => axios.$put(`/roles/${id}`, updatedRole),
    delete: (id) => axios.$delete(`/roles/${id}`),
    users: {
      list: (roleId, { lastKey, limit = 10 }) =>
        axios.$get(`/roles/${roleId}/users`, {
          params: { lastKey, limit },
        }),
      create: (roleId, userId) =>
        axios.$post(`/roles/${roleId}/users`, { userId }),
      delete: (roleId, userId) =>
        axios.$delete(`/roles/${roleId}/users/${userId}`),
    },
    permissions: {
      list: (roleId, { lastKey, limit = 10 }) =>
        axios.$get(`/roles/${roleId}/permissions`, {
          params: { lastKey, limit },
        }),
      create: (roleId, permissionId) =>
        axios.$post(`/roles/${roleId}/permissions`, { permissionId }),
      delete: (roleId, permissionId) =>
        axios.$delete(`/roles/${roleId}/permissions/${permissionId}`),
    },
  },
  permissions: {
    get: (permissionId) => axios.$get(`/permissions/${permissionId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/permissions', { params: { filter, lastKey, limit } }),
    create: (permission) => axios.$post('/permissions', permission),
    update: (id, updatedGroup) =>
      axios.$put(`/permissions/${id}`, updatedGroup),
    delete: (id) => axios.$delete(`/permissions/${id}`),
    roles: {
      list: (permissionId, { lastKey, limit = 10 }) =>
        axios.$get(`/permissions/${permissionId}/roles`, {
          params: { lastKey, limit },
        }),
      create: (permissionId, roleId) =>
        axios.$post(`/permissions/${permissionId}/roles`, { roleId }),
      delete: (permissionId, roleId) =>
        axios.$delete(`/permissions/${permissionId}/roles/${roleId}`),
    },
  },
  contexts: {
    get: ({ cache = true }) => axios.$get('/contexts', { params: { cache } }),
  },
})

/*
 ** Executed by ~/.nuxt/index.js with context given
 ** This method can be asynchronous
 */
export default ({ $axios }, inject) => {
  // Inject `api` key
  // -> app.$api
  // -> this.$api in vue components
  // -> this.$api in store actions/mutations
  const api = apiFactory($axios)
  inject('api', api)
}
