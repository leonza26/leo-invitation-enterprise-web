import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [
    { id: 1, message: 'New RSVP received from "David & Sarah" for Emerald Theme.', read: false, time: '5m ago' },
    { id: 2, message: 'Client "John Doe" generated a new Royal Gold invitation.', read: false, time: '2h ago' },
    { id: 3, message: 'System updated successfully to v1.2.0-beta.', read: true, time: '1d ago' },
    { id: 4, message: 'Client subscription "Platinum Tier" renewed.', read: true, time: '2d ago' },
  ],
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) => n.id === id ? { ...n, read: true } : n)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map((n) => ({ ...n, read: true }))
  })),
  clearNotifications: () => set({ notifications: [] }),
  addNotification: (message) => set((state) => ({
    notifications: [
      { id: Date.now(), message, read: false, time: 'Just now' },
      ...state.notifications
    ]
  }))
}))
