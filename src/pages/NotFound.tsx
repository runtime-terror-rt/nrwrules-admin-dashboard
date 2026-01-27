import { Link } from 'react-router-dom'
import { PageTitle } from '../components'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <PageTitle as={1}>Page not found</PageTitle>
      <p className="mb-6 text-[var(--color-text-secondary)]">The page you’re looking for doesn’t exist or was moved.</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/sign-in"
          className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Sign in
        </Link>
        <Link
          to="/user-management"
          className="rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-active-nav)]"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
