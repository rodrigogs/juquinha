const apiFactory = (fetch) => ({
  healthCheck: () => fetch(''),
  users: {
    get: (userId) => fetch(`users/id/${userId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      fetch('users', { params: { filter, lastKey, limit } }),
    create: (user) => fetch('users', { method: 'POST', body: user }),
    update: (id, updatedUser) => fetch(`users/${id}`, { method: 'PUT', body: updatedUser }),
    delete: (id) => fetch(`users/${id}`, { method: 'DELETE' }),
    roles: {
      list: (userId, { lastKey, limit = 10 }) =>
        fetch(`users/${userId}/roles`, {
          params: { lastKey, limit },
        }),
      create: (userId, roleId) =>
        fetch(`users/${userId}/roles`, { roleId }),
      delete: (userId, roleId) =>
        fetch(`users/${userId}/roles/${roleId}`, { method: 'DELETE' }),
    },
  },
  roles: {
    get: (roleId) => fetch(`roles/${roleId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      fetch('roles', { params: { filter, lastKey, limit } }),
    create: (role) => fetch('roles', { method: 'POST', body: role }),
    update: (id, updatedRole) => fetch(`roles/${id}`, { method: 'PUT', body: updatedRole }),
    delete: (id) => fetch(`roles/${id}`, { method: 'DELETE' }),
    permissions: {
      list: (roleId, { lastKey, limit = 10 }) =>
        fetch(`roles/${roleId}/permissions`, {
          params: { lastKey, limit },
        }),
      create: (roleId, permissionId) =>
        fetch(`roles/${roleId}/permissions`, { permissionId }),
      delete: (roleId, permissionId) =>
        fetch(`roles/${roleId}/permissions/${permissionId}`, { method: 'DELETE' }),
    },
  },
  permissions: {
    get: (permissionId) => fetch(`permissions/${permissionId}`),
    list: ({ filter, lastKey, limit = 10 }) =>
      fetch('permissions', { params: { filter, lastKey, limit } }),
    create: (permission) => fetch('permissions', { method: 'POST', body: permission }),
    update: (id, updatedPermission) => fetch(`permissions/${id}`, { method: 'PUT', body: updatedPermission }),
    delete: (id) => fetch(`permissions/${id}`, { method: 'DELETE' }),
  },
  contexts: {
    get: ({ cache = true }) => fetch('contexts', { params: { cache } }),
  },
})

export default (fetchComposable) => {
  const apiFetch = useApiFetch(fetchComposable)
  return apiFactory(apiFetch)
}
