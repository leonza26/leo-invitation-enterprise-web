import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '../components/layouts/ProtectedRoute'
import { DashboardPage } from '../components/pages/DashboardPage'
import { InvitationsPage } from '../components/pages/InvitationsPage'
import { RbacDemoPage } from '../components/pages/RbacDemoPage'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import Profile from '../pages/profile/Profile'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'invitations',
        element: <InvitationsPage />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'rbac',
        element: <RbacDemoPage />
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" replace />
      }
    ]
  }
])
