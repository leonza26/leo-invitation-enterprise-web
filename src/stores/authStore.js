import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            setCredentials: (user, token) => {
                set({ user, token, isAuthenticated: true });
                if (token) {
                    localStorage.setItem('auth_token', token);
                }
            },

            logout: async () => {
                try {
                    await api.auth.logout();
                } catch (e) {
                    // Ignore errors on logout
                }
                set({ user: null, token: null, isAuthenticated: false });
                localStorage.removeItem('auth_token');
            },
            
            fetchProfile: async () => {
                try {
                    const data = await api.auth.profile();
                    set({ user: data.user });
                } catch (e) {
                    set({ user: null, token: null, isAuthenticated: false });
                    localStorage.removeItem('auth_token');
                }
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ token: state.token }),
        }
    )
);
