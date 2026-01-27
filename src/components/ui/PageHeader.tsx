import { memo } from 'react'
import { PageTitle } from './PageTitle'

export interface PageHeaderProps {
  /** Main page title (h1, secondary color) */
  title: string
  /** Optional subtitle in primary color */
  subtitle?: string
  /** Optional short description (gray) */
  description?: string
  /** Optional right-aligned action (e.g. primary button) */
  action?: React.ReactNode
}

/**
 * Consistent page header — Figma design system.
 * Title uses secondary blue; subtitle uses primary; description uses gray.
 */
function PageHeaderComponent({ title, subtitle, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <PageTitle as={1}>{title}</PageTitle>
        {subtitle && (
          <p className="-mt-4 mb-1 text-sm text-[var(--color-primary)]">{subtitle}</p>
        )}
        {description && <p className="text-[var(--color-text-secondary)]">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export const PageHeader = memo(PageHeaderComponent)
