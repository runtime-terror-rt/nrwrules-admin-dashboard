import { memo } from 'react'
import type { IconName } from '../constants'
import type { StatCardData } from '../types'
import { Icon } from './ui/Icon'
import { Card } from './ui/Card'

export type StatCardProps = StatCardData & {
  icon?: IconName
  bgClassName?: string
}

/**
 * Dashboard stat card: optional icon, label, value, and change pill.
 * Composes Card; change pill uses success/warning tints (not solid Badge).
 * Use icon + bgClassName for Analytics-style metric cards per Figma.
 */
function StatCardComponent({ label, value, change, positive, icon, bgClassName }: StatCardProps) {
  return (
    <Card className={bgClassName}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-semibold text-[var(--color-primary)]">{value}</p>
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
              positive ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
            }`}
          >
            {change}
          </span>
        </div>
        {icon && (
          <Icon name={icon} size={28} className="shrink-0 opacity-80" primary />
        )}
      </div>
    </Card>
  )
}

export const StatCard = memo(StatCardComponent)
