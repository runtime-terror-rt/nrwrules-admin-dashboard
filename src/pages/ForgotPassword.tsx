import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ASSETS, theme } from '../constants'
import { Button, Input } from '../components/ui'

/**
 * Forgot Password — Figma design system: page bg, white card, primary button.
 */
export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: call reset API — for now show success
    setSent(true)
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
        <h1 className="mb-1 text-center text-2xl font-bold" style={{ color: theme.color.secondary }}>
          Forgot password?
        </h1>
        <p className="mb-6 text-center text-sm" style={{ color: theme.color.textSecondary }}>
          {sent
            ? 'If an account exists for that email, we’ve sent a reset link.'
            : 'Enter your email and we’ll send you a link to reset your password.'}
        </p>
        {sent ? (
          <div className="space-y-4">
            <div
              className="rounded-lg px-4 py-3 text-sm"
              style={{ backgroundColor: theme.color.activeNav, color: theme.color.primary }}
            >
              Check your inbox for the reset link.
            </div>
            <Link to="/sign-in" className="block">
              <Button type="button" variant="primary" size="lg" className="w-full">
                Back to Sign in
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium" style={{ color: theme.color.textPrimary }}>
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
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Send reset link
            </Button>
          </form>
        )}
        <div className="mt-6 text-center">
          <Link
            to="/sign-in"
            className="text-sm font-medium hover:underline"
            style={{ color: theme.color.primary }}
          >
            ← Back to Sign in
          </Link>
        </div>
      </div>
      {/* <p className="mt-6 text-center text-sm" style={{ color: theme.color.textSecondary }}>
        Mamabot Admin · Design system Figma 3468-1203
      </p> */}
    </div>
  )
}
