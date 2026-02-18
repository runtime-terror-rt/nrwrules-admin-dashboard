import { memo, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { theme, type IconName } from '../../constants'
import type { NavItem, CurrentUser } from '../../types'
import { Icon } from '../ui'
import { useAppDispatch } from '../../redux/store/hooks'
import { logOut } from '../../redux/features/slice/authSlice'
import { useLogOutMutation } from '@/redux/features/api/auth/authApi'
import logo from '../../../public/assets/icon.png'

export interface SidebarProps {
  brand: string
  navItems: NavItem[]
  user: CurrentUser
  isCollapsed?: boolean
  setIsCollapsed?: (v: boolean) => void
  isMobileOpen?: boolean
  setIsMobileOpen?: (v: boolean) => void
}

const primary = theme.color.primary
const activeBg = theme.color.activeNav
const sidebarBg = theme.color.sidebar

/** Figma 3468-1203: sidebar is a card — margin top/left, white bg, rounded, shadow */
const SIDEBAR_MARGIN = 16
const SIDEBAR_HEIGHT_OFFSET = SIDEBAR_MARGIN * 2

function SidebarComponent({
  brand,
  navItems,
  user,
  isCollapsed = false,
  setIsCollapsed = () => {},
  isMobileOpen = false,
  setIsMobileOpen = () => {},
}: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [cmsExpanded, setCmsExpanded] = useState(true)
  const [communityExpanded, setCommunityExpanded] = useState(true)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const [logout] = useLogOutMutation()

  const handleLogout = () => {
    logout()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('adminUser')
    dispatch(logOut())
    setUserMenuOpen(false)
    navigate('/sign-in')
  }

  useEffect(() => {
    if (!userMenuOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [userMenuOpen])

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-80 lg:translate-x-0'
        } ${isCollapsed ? 'w-[80px]' : 'w-64'}`}
        style={{
          top: SIDEBAR_MARGIN,
          left: isMobileOpen ? SIDEBAR_MARGIN : SIDEBAR_MARGIN, // Handled by translate on mobile
          height: `calc(100vh - ${SIDEBAR_HEIGHT_OFFSET}px)`,
          backgroundColor: sidebarBg,
          boxShadow: theme.shadow.card,
        }}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 px-4 py-4">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full "
              aria-hidden
            >
              <img src={logo} alt="" className="h-9 w-9 object-contain" />
            </span>
            {!isCollapsed && (
              <span className="truncate font-bold text-lg" style={{ color: primary }}>
                {brand}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() =>
              window.innerWidth < 1024 ? setIsMobileOpen(false) : setIsCollapsed(!isCollapsed)
            }
            className="shrink-0 p-3 transition-colors bg-white  rounded-lg hover:bg-rose-100 lg:block"
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <Icon name={isCollapsed ? 'chevron-right' : 'chevron-down'} size={20} primary />
          </button>
        </div>

        <div className="mx-4 h-px shrink-0" style={{ backgroundColor: activeBg }} aria-hidden />

        <nav className="sidebar-nav-scroll min-h-0 flex-1 overflow-y-auto px-3 py-3">
          {navItems.map((item) => {
            const hasChildren = !!item.children?.length
            const isCmsItem = item.id === 'cms'

            if (hasChildren) {
              const isExpanded = isCmsItem ? cmsExpanded : item.id === 'community' ? communityExpanded : false
              const setExpanded = isCmsItem ? setCmsExpanded : item.id === 'community' ? setCommunityExpanded : () => {}
              
              const isActive = item.children?.some(c => location.pathname === c.path) || 
                             (isCmsItem && (location.pathname.startsWith('/cms/') || location.pathname === '/cms'))

              return (
                <div key={item.id} className="mb-0.5">
                  <button
                    type="button"
                    onClick={() => setExpanded((prev: boolean) => !prev)}
                    className={`relative flex w-full items-center gap-3 rounded-r-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                      isActive ? 'font-semibold' : 'text-gray-700 hover:bg-[#FEE3ED]/50'
                    }`}
                    style={isActive ? { backgroundColor: activeBg, color: primary } : undefined}
                  >
                    {isActive && (
                      <span
                        className="absolute left-0 top-0 h-full w-1 rounded-r"
                        style={{ backgroundColor: primary }}
                        aria-hidden
                      />
                    )}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      <Icon name={(item.icon as IconName) || 'users'} size={20} primary />
                    </span>
                    {!isCollapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                    {!isCollapsed && (
                      <span
                        className={`shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      >
                        <Icon name="chevron-down" size={16} primary />
                      </span>
                    )}
                  </button>

                  {isExpanded && item.children && (
                    <div className="ml-4 mt-0.5 border-l-2 pl-3" style={{ borderColor: activeBg }}>
                      {item.children.map((c) => (
                        <NavLink
                          key={c.path}
                          to={c.path}
                          className={({ isActive }) =>
                            `flex items-center justify-between gap-2 py-2 text-xs transition-colors ${
                              isActive ? 'font-semibold' : 'text-gray-600 hover:text-gray-800'
                            }`
                          }
                          style={({ isActive }) => (isActive ? { color: primary } : undefined)}
                        >
                          {({ isActive }) => (
                            <>
                              {!isCollapsed && (
                                <span className="min-w-0 flex-1 truncate">{c.label}</span>
                              )}
                              <Icon name="chevron-right" size={14} primary={isActive} />
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <div key={item.id} className="mb-0.5">
                <NavLink
                  to={item.path}
                  end={!hasChildren}
                  className={({ isActive }) => {
                    const showActive = isActive && !hasChildren
                    return `relative flex items-center gap-3 rounded-r-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      showActive ? 'font-semibold' : 'text-gray-700 hover:bg-[#FEE3ED]/50'
                    }`
                  }}
                  style={({ isActive }) => {
                    const showActive = isActive && !hasChildren
                    return showActive ? { backgroundColor: activeBg, color: primary } : undefined
                  }}
                >
                  {({ isActive }) => {
                    const showActive = isActive && !hasChildren
                    return (
                      <>
                        {showActive && (
                          <span
                            className="absolute left-0 top-0 h-full w-1 rounded-r"
                            style={{ backgroundColor: primary }}
                            aria-hidden
                          />
                        )}
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                          <Icon name={(item.icon as IconName) || 'users'} size={20} primary />
                        </span>
                        {!isCollapsed && (
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                        )}
                      </>
                    )
                  }}
                </NavLink>
              </div>
            )
          })}
        </nav>

        <div className="mx-4 h-px shrink-0" style={{ backgroundColor: activeBg }} aria-hidden />

        <div className="relative shrink-0 p-4" ref={userMenuRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setUserMenuOpen((o) => !o)
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-0"
            style={{ backgroundColor: activeBg }}
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
            aria-label="User menu"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
              style={{ backgroundColor: sidebarBg, color: primary }}
            >
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : (
                initials
              )}
            </div>
            {!isCollapsed && (
              <>
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate text-sm font-semibold" style={{ color: primary }}>
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-gray-600">{user.email}</p>
                </div>
                <Icon
                  name="chevron-down"
                  size={16}
                  primary
                  className={`shrink-0 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                />
              </>
            )}
          </button>

          {userMenuOpen && (
            <div
              className="absolute bottom-full left-4 right-4 mb-1 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              role="menu"
            >
              <NavLink
                to="/cms/web-settings"
                role="menuitem"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Icon name="gear" size={18} />
                <span>User settings</span>
              </NavLink>
              <NavLink
                to="/subscription"
                role="menuitem"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Icon name="credit" size={18} />
                <span>Subscription</span>
              </NavLink>
              <NavLink
                to="/profile"
                role="menuitem"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Icon name="users" size={18} />
                <span>Profile</span>
              </NavLink>
              <div className="my-1 border-t border-gray-100" role="separator" />
              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Icon name="x" size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export const Sidebar = memo(SidebarComponent)
