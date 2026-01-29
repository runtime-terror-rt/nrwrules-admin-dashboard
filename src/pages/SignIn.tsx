import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ASSETS, theme } from '../constants'
import { Button, Input } from '../components/ui'
import { useLoginMutation } from '../redux/features/api/auth/authApi'
import { useAppDispatch } from '../redux/store/hooks'
import { setUser } from '../redux/features/slice/authSlice'

/**
 * Sign In — Figma design system: page bg, white card, primary button.
 */
export function SignIn() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      // result is { success: true, message: "...", data: { token: "...", user: { ... } } }
      if (result.data?.token) {
        localStorage.setItem('accessToken', result.data.token)
        localStorage.setItem('adminUser', JSON.stringify(result.data.user))
        dispatch(setUser(result.data.user))
        navigate('/user-management', { replace: true })
      }
    } catch (err) {
      console.error('Failed to login:', err)
    }
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4 py-8"
      style={{ backgroundColor: theme.color.pageBackground }}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-gray-100 p-8"
        style={{
          backgroundColor: theme.color.surface,
          boxShadow: theme.shadow.card,
        }}
      >
        <div className="mb-6 flex items-center justify-center gap-2">
          <img src={ASSETS.images.logo} alt="" className="h-9 w-9" />
          <span className="text-xl font-bold" style={{ color: theme.color.secondary }}>
            Mamabot
          </span>
        </div>
        <h1
          className="mb-1 text-center text-2xl font-bold"
          style={{ color: theme.color.secondary }}
        >
          Sign in
        </h1>
        <p className="mb-6 text-center text-sm" style={{ color: theme.color.textSecondary }}>
          Enter your credentials to access the dashboard.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-500">
            {'data' in (error as any) ? (error as any).data.message : 'Login failed'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: theme.color.textPrimary }}
            >
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: theme.color.textPrimary }}
            >
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium hover:underline"
              style={{ color: theme.color.primary }}
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
      <p className="mt-6 text-center text-sm" style={{ color: theme.color.textSecondary }}>
        Mamabot Admin · Design system Figma 3468-1203
      </p>
    </div>
  )
}
