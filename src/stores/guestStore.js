import { create } from 'zustand'
import api from '../services/api'

export const useGuestStore = create((set, get) => ({
  guests: [],
  pagination: {},
  loading: false,
  error: null,

  fetchGuests: async (eventId, search = '', filter = {}) => {
    set({ loading: true, error: null })
    try {
      const queryParams = new URLSearchParams()
      if (search) queryParams.append('search', search)
      if (filter.vip_status) queryParams.append('vip_status', filter.vip_status)
      if (filter.attendance_status) queryParams.append('attendance_status', filter.attendance_status)
      if (filter.category) queryParams.append('category', filter.category)
      if (filter.page) queryParams.append('page', filter.page)

      const response = await api.guests.list(eventId, queryParams.toString())
      set({ 
        guests: response.data, 
        pagination: {
          current_page: response.current_page,
          last_page: response.last_page,
          total: response.total,
          per_page: response.per_page
        },
        loading: false 
      })
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  createGuest: async (eventId, guestData) => {
    try {
      await api.guests.create(eventId, guestData)
      // refresh list
      const state = get()
      await state.fetchGuests(eventId)
    } catch (error) {
      throw error
    }
  },

  updateGuest: async (eventId, guestId, guestData) => {
    try {
      await api.guests.update(eventId, guestId, guestData)
      const state = get()
      await state.fetchGuests(eventId)
    } catch (error) {
      throw error
    }
  },

  deleteGuest: async (eventId, guestId) => {
    try {
      await api.guests.delete(eventId, guestId)
      const state = get()
      await state.fetchGuests(eventId)
    } catch (error) {
      throw error
    }
  },

  importGuests: async (eventId, guestsArray) => {
    try {
      await api.guests.import(eventId, { guests: guestsArray })
      const state = get()
      await state.fetchGuests(eventId)
    } catch (error) {
      throw error
    }
  }
}))
