import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { GlobalLayout } from './GlobalLayout';

export const ProtectedRoute = () => {
    const { isAuthenticated, fetchProfile, token } = useAuthStore();

    useEffect(() => {
        if (token && !isAuthenticated) {
            fetchProfile();
        }
    }, [token, isAuthenticated, fetchProfile]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <GlobalLayout>
            <Outlet />
        </GlobalLayout>
    );
};
