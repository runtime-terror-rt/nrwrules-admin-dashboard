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
function PageHeaderComponent({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <PageTitle as={1}>{title}</PageTitle>
        {description && <p className="text-text-secondary">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export const PageHeader = memo(PageHeaderComponent)
