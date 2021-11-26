const apiFactory = (axios) => ({
  healthCheck: () => axios.$get('/'),
  users: {
    get: (userId) => axios.$get(`/users/id/${userId}`),
    getMetacemDoctor: (crm, uf) => axios.$get(`/users/metacem/${crm}/${uf}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/users', { params: { filter, lastKey, limit } }),
    create: (user) => axios.$post('/users', user),
    createMetacemDoctor: (id, doctor) =>
      axios.$post(`/users/${id}/metacem`, doctor),
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
    groups: {
      list: (userId, { lastKey, limit = 10 }) =>
        axios.$get(`/users/${userId}/groups`, {
          params: { lastKey, limit },
        }),
      create: (userId, groupId) =>
        axios.$post(`/users/${userId}/groups`, { groupId }),
      delete: (userId, groupId) =>
        axios.$delete(`/users/${userId}/groups/${groupId}`),
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
  stations: {
    get: (stationId) => axios.$get(`/stations/${stationId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/stations', { params: { filter, lastKey, limit } }),
    create: (station) => axios.$post('/stations', { ...station }),
    update: (id, updatedStation) =>
      axios.$put(`/stations/${id}`, updatedStation),
    delete: (id) => axios.$delete(`/stations/${id}`),
    agendas: {
      list: (stationId, { lastKey, limit = 10 }) =>
        axios.$get(`/stations/${stationId}/agendas`, {
          params: { lastKey, limit },
        }),
      create: (stationId, agendaId) =>
        axios.$post(`/stations/${stationId}/agendas`, { agendaId }),
      delete: (stationId, agendaId) =>
        axios.$delete(`/stations/${stationId}/agendas/${agendaId}`),
    },
  },
  groups: {
    get: (groupId) => axios.$get(`/groups/${groupId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/groups', { params: { filter, lastKey, limit } }),
    create: (group) => axios.$post('/groups', group),
    update: (id, updatedGroup) => axios.$put(`/groups/${id}`, updatedGroup),
    delete: (id) => axios.$delete(`/groups/${id}`),
    users: {
      list: (groupId, { lastKey, limit = 10 }) =>
        axios.$get(`/groups/${groupId}/users`, {
          params: { lastKey, limit },
        }),
      create: (groupId, userId) =>
        axios.$post(`/groups/${groupId}/users`, { userId }),
      delete: (groupId, userId) =>
        axios.$delete(`/groups/${groupId}/users/${userId}`),
    },
    agendas: {
      list: (groupId, { lastKey, limit = 10 }) =>
        axios.$get(`/groups/${groupId}/agendas`, {
          params: { lastKey, limit },
        }),
      create: (groupId, agendaId) =>
        axios.$post(`/groups/${groupId}/agendas`, { agendaId }),
      delete: (groupId, agendaId) =>
        axios.$delete(`/groups/${groupId}/agendas/${agendaId}`),
    },
  },
  agendas: {
    get: (agendaId) => axios.$get(`/agendas/id/${agendaId}`),
    create: (agenda) => axios.$post('/agendas', agenda),
    createUserAgenda: (userId, agendaId) =>
      axios.$put(`/agendas/${agendaId}/users/${userId}`),
    delete: (agendaId) => axios.$delete(`/agendas/${agendaId}`),
    deleteUserAgenda: (userId, agendaId) =>
      axios.$delete(`/agendas/${agendaId}/users/${userId}`),
    update: (agendaId, updatedData) =>
      axios.$put(`/agendas/${agendaId}`, updatedData),
    list: ({ filter, lastKey, limit = 10 }) =>
      axios.$get('/agendas', { params: { filter, lastKey, limit } }),
    appointments: {
      list: (agendaId, { filter, lastKey, limit = 10 }) =>
        axios.$get(`/agendas/${agendaId}/appointments`, {
          params: { filter, lastKey, limit },
        }),
    },
    users: (agendaId, { lastKey, limit = 10 }) =>
      axios.$get(`/agendas/${agendaId}/users`, { params: { lastKey, limit } }),
    stations: {
      list: (agendaId, { lastKey, limit = 10 }) =>
        axios.$get(`/agendas/${agendaId}/stations`, {
          params: { lastKey, limit },
        }),
      create: (agendaId, stationId) =>
        axios.$post(`/agendas/${agendaId}/stations`, { stationId }),
      delete: (agendaId, stationId) =>
        axios.$delete(`/agendas/${agendaId}/stations/${stationId}`),
    },
    groups: {
      list: (agendaId, { lastKey, limit = 10 }) =>
        axios.$get(`/agendas/${agendaId}/groups`, {
          params: { lastKey, limit },
        }),
      create: (agendaId, groupId) =>
        axios.$post(`/agendas/${agendaId}/groups`, { groupId }),
      delete: (agendaId, groupId) =>
        axios.$delete(`/agendas/${agendaId}/groups/${groupId}`),
    },
  },
  appointments: {
    get: (appointmentId) => axios.$get(`/appointments/id/${appointmentId}`),
    getByPin: (pin) => axios.$get(`/appointments/pin/${pin}`),
    create: (appointment) => axios.$post('/appointments', appointment),
    update: (appointmentId, updatedData) =>
      axios.$put(`/appointments/${appointmentId}`, updatedData),
    list: ({ nameContains, filter, lastKey, limit = 10 }) =>
      axios.$get('/appointments', {
        params: { nameContains, filter, lastKey, limit },
      }),
    delete: (appointmentId) => axios.$delete(`/appointments/${appointmentId}`),
    rating: (pin, rating) =>
      axios.$put(`/appointments/pin/${pin}/rating`, rating),
    attendMetacemAppointment: (appointmentId, medicoId, payload) =>
      axios.$post(
        `/appointments/metacem/attend/${appointmentId}/${medicoId}`,
        payload
      ),
    endMetacemAppointment: (medicoId, atendimentoId, horaFinal) =>
      axios.$put(
        `/appointments/metacem/end/${medicoId}/${atendimentoId}`,
        horaFinal
      ),
    exams: {
      get: (pin, exam) => axios.$get(`/appointments/pin/${pin}/exams/${exam}`),
      list: (pin) => axios.$get(`/appointments/pin/${pin}/exams`),
      create: (pin, exam) => axios.$put(`/appointments/pin/${pin}/exams`, exam),
      delete: (pin, exam) =>
        axios.$delete(`/appointments/pin/${pin}/exams/${exam}`),
    },
  },
  conversations: {
    getByAppointment: (appointmentId) =>
      axios.$get(`/conversations/${appointmentId}`),
    getVideoSession: (appointmentId, userId) =>
      axios.$get(`/conversations/${appointmentId}/${userId}`),
    createVideoSession: ({ appointmentId, userId }) =>
      axios.$post('/conversations', { appointmentId, userId }),
    finishVideoSession: (appointmentId, userId) =>
      axios.$delete(`/conversations/${appointmentId}/${userId}`),
  },
  configs: {
    list: ({ lastKey, limit = 10 }) =>
      axios.$get('/configs', { params: { lastKey, limit } }),
    getByTenant: (tenant) => axios.$get(`/configs/${tenant}`),
    getByTenantAndName: (tenant, name) =>
      axios.$get(`/configs/${tenant}/${name}`),
    createOrUpdate: (config) => axios.$post('/configs', config),
    delete: (tenant, name) => axios.$delete(`/configs/${tenant}/${name}`),
    uploadImage: (file) => axios.$put('/configs/header/image', file),
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
