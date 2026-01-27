import { memo, forwardRef, type InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Optional error state for validation feedback */
  error?: boolean
}

/**
 * Base text input with design-system styling.
 * Prefer SearchInput when you need a search icon.
 */
const InputComponent = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => (
    <input
      ref={ref}
      className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] disabled:opacity-50 ${
        error ? 'border-red-500' : 'border-[var(--color-border)]'
      } ${className}`}
      {...props}
    />
  )
)

InputComponent.displayName = 'Input'

export const Input = memo(InputComponent)
