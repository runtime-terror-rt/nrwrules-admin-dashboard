import { memo, type ReactNode } from 'react'

export type BadgeVariant = 'success' | 'danger' | 'warning' | 'neutral'

export interface BadgeProps {
  /** Visual variant */
  variant: BadgeVariant
  /** Badge content */
  children: ReactNode
  /** Optional leading icon */
  icon?: ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-green-500 text-white',
  danger: 'bg-red-500 text-white',
  warning: 'bg-orange-100 text-orange-700',
  neutral: 'bg-gray-100 text-gray-700',
}

/**
 * Pill-shaped status or label badge.
 * Use for status (Active/Deactivate), change indicators (+5%, -2%), etc.
 */
function BadgeComponent({ variant, children, icon, className = '' }: BadgeProps) {
  const layoutClasses = 'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium'

  return (
    <span className={`${layoutClasses} ${variantStyles[variant]} ${className}`}>
      {icon}
      {children}
    </span>
  )
}

export const Badge = memo(BadgeComponent)
