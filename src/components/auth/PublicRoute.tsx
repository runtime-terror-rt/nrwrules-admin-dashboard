import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function PublicRoute() {
  const { user } = useAuth()
  const token = localStorage.getItem('accessToken')

  if (user || token) {
    return <Navigate to="/user-management" replace />
  }

  return <Outlet />
}
