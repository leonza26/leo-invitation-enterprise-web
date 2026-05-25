import api from './api';

export const login = async (credentials) => {
    // CSRF cookie is required by sanctum before login usually if using SPA,
    // but since we're using token auth, we can just hit login.
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (data) => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
};
