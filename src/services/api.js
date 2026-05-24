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
    profile: () => apiClient.request('auth/me')
  }
}
export default apiClient
