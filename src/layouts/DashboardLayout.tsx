/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components'
import { useAuth } from '../hooks/useAuth'
import { navItems, currentUser } from '../data'
import { theme } from '../constants'
import { useState } from 'react'

/**
 * Dashboard layout: Sidebar (floating card) + main. Figma 3468-1203.
 */
export function DashboardLayout() {
  const { user } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Use user from auth if available, otherwise fallback to static data
  const displayUser = user || currentUser

  const sidebarWidth = isCollapsed ? 80 : 256
  const MAIN_OFFSET_PX = 16 + sidebarWidth + 16

  return (
    <div
      className="min-h-screen relative flex"
      style={{ backgroundColor: theme.color.pageBackground }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <img src="/assets/icon.png" alt="" className="h-8 w-8 object-contain" />
          <span className="font-bold text-lg" style={{ color: theme.color.primary }}>
            Mamabot
          </span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="rounded-lg p-2 hover:bg-gray-100">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: theme.color.primary }}
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <Sidebar
        brand="Mamabot"
        navItems={navItems}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        user={{
          name: displayUser.name,
          email: displayUser.email,
          avatarUrl:
            ('avatarUrl' in displayUser ? (displayUser as any).avatarUrl : undefined) ||
            ('image' in displayUser ? (displayUser as any).image : undefined),
        }}
      />
      <main
        className="flex-1 min-h-screen transition-all duration-300 ease-in-out p-4 md:p-8 mt-16 lg:mt-0"
        style={{
          marginLeft:
            typeof window !== 'undefined' && window.innerWidth >= 1024 ? MAIN_OFFSET_PX : 0,
          backgroundColor: theme.color.pageBackground,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
