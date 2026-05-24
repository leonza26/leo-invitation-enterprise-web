import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: {
    name: 'Aurelia Sterling',
    email: 'aurelia@leo-wedding.com',
    role: 'super_admin' // super_admin, client, operator, guest
  },
  setRole: (role) => set((state) => ({
    user: { ...state.user, role }
  })),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}))
