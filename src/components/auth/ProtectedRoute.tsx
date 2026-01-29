import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useGetCurrentUserQuery } from '../../redux/features/api/auth/authApi'
import { useAppDispatch } from '../../redux/store/hooks'
import { setUser } from '../../redux/features/slice/authSlice'
import { theme } from '../../constants'
import type { User } from '../../types'

interface ApiError {
  status: number
  data?: {
    message?: string
  }
}

export default function ProtectedRoute() {
  const { user } = useAuth()
  const token = localStorage.getItem('accessToken')
  const dispatch = useAppDispatch()
  const location = useLocation()

  // Hydrate user from localStorage if not in Redux but token exists
  useEffect(() => {
    if (!user && token) {
      const storedUser = localStorage.getItem('adminUser')
      if (storedUser) {
        try {
          dispatch(setUser(JSON.parse(storedUser)))
        } catch (e) {
          console.error('Failed to parse stored user:', e)
        }
      }
    }
  }, [user, token, dispatch])

  // Try to fetch fresh user info from API
  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useGetCurrentUserQuery(undefined, {
    skip: !token, // Only fetch if we have a token
  })

  useEffect(() => {
    if (userData) {
      // Assuming userData is { success: true, data: { user: { ... } } } or similar
      // Adjust based on actual API response structure
      const userToSet =
        (userData as { data?: { user?: User } })?.data?.user ||
        (userData as { user?: User })?.user ||
        (userData as User)

      if (userToSet && userToSet.email) {
        dispatch(setUser(userToSet))
        localStorage.setItem('adminUser', JSON.stringify(userToSet))
      }
    }
  }, [userData, dispatch])

  // If no token, redirect to sign-in
  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  // Handle API errors
  if (isError) {
    const errorStatus = (error as ApiError)?.status
    // Only redirect on 401/403. For 500, we might still have hydrated user.
    if (errorStatus === 401 || errorStatus === 403) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('adminUser')
      return <Navigate to="/sign-in" state={{ from: location }} replace />
    }
  }

  // While waiting for initial hydration/fetch if NO user is available yet
  if (isLoading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          style={{ color: theme.color.primary }}
          role="status"
        >
          <span
            className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!"
            style={{ color: theme.color.primary }}
          >
            Loading...
          </span>
        </div>
      </div>
    )
  }

  // If we still have no user after loading, and it's not a 500 error, redirect
  // But if we have a user (hydrated or fetched), we're good
  if (!user && !isLoading && !isError) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }

  return <Outlet />
}
