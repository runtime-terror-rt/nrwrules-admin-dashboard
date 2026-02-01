/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components'
import { useAuth } from '../hooks/useAuth'
import { navItems, currentUser } from '../data'
import { theme } from '../constants'

/** Sidebar card: left 16px + width 256px + gap 16px = main starts at 288px */
const MAIN_OFFSET_PX = 16 + 256 + 16

/**
 * Dashboard layout: Sidebar (floating card) + main. Figma 3468-1203.
 */
export function DashboardLayout() {
  const { user } = useAuth()

  // Use user from auth if available, otherwise fallback to static data
  const displayUser = user || currentUser

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.color.pageBackground }}>
      <Sidebar
        brand="Mamabot"
        navItems={navItems}
        user={{
          name: displayUser.name,
          email: displayUser.email,
          avatarUrl:
            ('avatarUrl' in displayUser ? (displayUser as any).avatarUrl : undefined) ||
            ('image' in displayUser ? (displayUser as any).image : undefined),
        }}
      />
      <main
        className="min-h-screen overflow-auto p-8"
        style={{
          paddingLeft: MAIN_OFFSET_PX,
          backgroundColor: theme.color.pageBackground,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}
