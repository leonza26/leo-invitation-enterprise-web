import { create } from 'zustand';
import api from '../services/api';

export const useEventStore = create((set, get) => ({
    events: [],
    loading: false,
    error: null,

    fetchEvents: async () => {
        set({ loading: true, error: null });
        try {
            const data = await api.events.list();
            set({ events: data.events, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    createEvent: async (eventData) => {
        set({ loading: true, error: null });
        try {
            const data = await api.events.create(eventData);
            set(state => ({ events: [data.event, ...state.events], loading: false }));
            return data.event;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    updateEvent: async (id, eventData) => {
        set({ loading: true, error: null });
        try {
            const data = await api.events.update(id, eventData);
            set(state => ({
                events: state.events.map(e => e.id === id ? data.event : e),
                loading: false
            }));
            return data.event;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    deleteEvent: async (id) => {
        set({ loading: true, error: null });
        try {
            await api.events.delete(id);
            set(state => ({
                events: state.events.filter(e => e.id !== id),
                loading: false
            }));
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    duplicateEvent: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await api.events.duplicate(id);
            set(state => ({ events: [data.event, ...state.events], loading: false }));
            return data.event;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    publishEvent: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await api.events.publish(id);
            set(state => ({
                events: state.events.map(e => e.id === id ? data.event : e),
                loading: false
            }));
            return data.event;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },

    archiveEvent: async (id) => {
        set({ loading: true, error: null });
        try {
            const data = await api.events.archive(id);
            set(state => ({
                events: state.events.map(e => e.id === id ? data.event : e),
                loading: false
            }));
            return data.event;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    }
}));
