import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../fragments/Sidebar'
import { Navbar } from '../fragments/Navbar'
import { ToastContainer } from '../fragments/Toast'
import { ModalContainer } from '../fragments/Modal'

export const GlobalLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-stone-50 dark:bg-zinc-950 transition-colors duration-300 text-stone-800 dark:text-stone-100">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Dynamic Page Router Outlet */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Overlay Services */}
      <ToastContainer />
      <ModalContainer />
    </div>
  )
}
