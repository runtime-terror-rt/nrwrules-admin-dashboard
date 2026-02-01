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
    <Card className={`h-40 flex flex-col justify-around gap-5 ${bgClassName}`}>
      <div className="h-full flex items-start justify-between gap-5">
        <div className="min-w-0 flex-1 flex flex-col justify-around gap-5">
          <p className="mb-1 text-sm xl:text-base text-gray-600">{label}</p>
          <div className="flex items-center justify-between">
            <p className="text-3xl xl:text-5xl font-semibold text-(--color-primary)">{value}</p>
            <span
              className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                positive ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}
            >
              {change}
            </span>
          </div>
        </div>
        {icon && <Icon name={icon} size={28} className="shrink-0 opacity-80 " primary />}
      </div>
    </Card>
  )
}

export const StatCard = memo(StatCardComponent)
