import { memo, type HTMLAttributes, type ReactNode } from 'react'
import { theme } from '../../constants'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Container with design-system shadow and radius.
 * Use for stat cards, profile cards, and content blocks.
 */
function CardComponent({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white p-4 ${className}`}
      style={{ boxShadow: theme.shadow.card }}
      {...props}
    >
      {children}
    </div>
  )
}

export const Card = memo(CardComponent)
