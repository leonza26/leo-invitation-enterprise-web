import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { GlobalLayout } from '../components/layouts/GlobalLayout'
import { DashboardPage } from '../components/pages/DashboardPage'
import { InvitationsPage } from '../components/pages/InvitationsPage'
import { RbacDemoPage } from '../components/pages/RbacDemoPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <GlobalLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: 'invitations',
        element: <InvitationsPage />
      },
      {
        path: 'rbac',
        element: <RbacDemoPage />
      },
      {
        path: '*',
        element: <Navigate to="/" replace />
      }
    ]
  }
])
