/**
 * Leo Invitation Enterprise - Base API Client
 * Interfaces with Laravel 13 backend controllers.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export const apiClient = {
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token')
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}))
      throw new Error(errData.message || 'Something went wrong')
    }

    return response.json()
  },

  invitations: {
    list: () => apiClient.request('invitations'),
    get: (id) => apiClient.request(`invitations/${id}`),
    create: (data) => apiClient.request('invitations', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiClient.request(`invitations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiClient.request(`invitations/${id}`, { method: 'DELETE' }),
  },

  rsvps: {
    list: (invitationId) => apiClient.request(`invitations/${invitationId}/rsvps`),
    submit: (invitationId, data) => apiClient.request(`invitations/${invitationId}/rsvps`, { method: 'POST', body: JSON.stringify(data) })
  },

  auth: {
    login: (credentials) => apiClient.request('auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (data) => apiClient.request('auth/register', { method: 'POST', body: JSON.stringify(data) }),
    logout: () => apiClient.request('auth/logout', { method: 'POST' }),
    profile: () => apiClient.request('auth/profile'),
    forgotPassword: (email) => apiClient.request('auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
    resetPassword: (data) => apiClient.request('auth/reset-password', { method: 'POST', body: JSON.stringify(data) })
  },

  events: {
    list: () => apiClient.request('events'),
    get: (id) => apiClient.request(`events/${id}`),
    create: (data) => apiClient.request('events', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiClient.request(`events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => apiClient.request(`events/${id}`, { method: 'DELETE' }),
    duplicate: (id) => apiClient.request(`events/${id}/duplicate`, { method: 'POST' }),
    publish: (id) => apiClient.request(`events/${id}/publish`, { method: 'POST' }),
    archive: (id) => apiClient.request(`events/${id}/archive`, { method: 'POST' })
  },

  dashboard: {
    get: () => apiClient.request('dashboard')
  }
}
export default apiClient
