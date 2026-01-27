import { theme } from '../constants'

export interface LoadingScreenProps {
  /** Full viewport height (e.g. initial app load); default fills container */
  fullScreen?: boolean
  /** Optional message below spinner */
  message?: string
}

/**
 * Branded loading state: spinner + optional message.
 * Uses Mamabot primary color and fits layout or full screen.
 */
export function LoadingScreen({ fullScreen = false, message = 'Loading…' }: LoadingScreenProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 bg-white"
      style={{ minHeight: fullScreen ? '100vh' : 'min(40vh, 320px)' }}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-[#FEE3ED] border-t-[var(--color-primary)]"
        style={{ borderTopColor: theme.color.primary }}
        aria-hidden
      />
      <p className="text-sm font-medium text-gray-600">{message}</p>
    </div>
  )
}
