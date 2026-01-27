import { Card, PageHeader, PageTitle, StatCard } from '../components'
import {
  analyticsStats,
  dailySummaryCards,
  featureEngagementData,
  keyInsights,
  dailyActiveUsersData,
  userActivityByPhaseData,
} from '../data'

const DAYS = ['Jan 8', 'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12', 'Jan 13', 'Jan 14'] as const
const Y_MAX_DAU = 300
const Y_MAX_FEATURE = 600
const Y_MAX_PHASE = 600

function DailyActiveUsersLineChart() {
  const values = dailyActiveUsersData
  const w = 400
  const h = 160
  const pad = { l: 32, r: 16, t: 8, b: 24 }
  const plotW = w - pad.l - pad.r
  const plotH = h - pad.t - pad.b
  const pts = values.map((y, i) => {
    const x = pad.l + (i / Math.max(1, values.length - 1)) * plotW
    const yy = pad.t + plotH - (y / Y_MAX_DAU) * plotH
    return `${x},${yy}`
  })
  const polylinePoints = pts.join(' ')
  return (
    <div className="h-48 w-full overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${h}`} className="min-w-full" preserveAspectRatio="xMidYMid meet">
        <polyline
          fill="none"
          stroke="#F8BBD0"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polylinePoints}
        />
        {DAYS.map((d, i) => (
          <text
            key={d}
            x={pad.l + (i / Math.max(1, DAYS.length - 1)) * plotW}
            y={h - 4}
            className="fill-[var(--color-text-secondary)] text-[10px]"
            textAnchor="middle"
          >
            {d}
          </text>
        ))}
      </svg>
    </div>
  )
}

function FeatureEngagementChart() {
  return (
    <div className="flex h-48 items-end justify-between gap-1">
      {featureEngagementData.map(({ label, value }) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t bg-[var(--color-primary)]"
            style={{ height: `${(value / Y_MAX_FEATURE) * 100}%` }}
          />
          <span className="text-center text-[10px] text-gray-500" title={label}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

/**
 * Analytics — Figma node 3575-11428.
 * Title/subtitle/description, stat cards, charts, daily summary, key insights.
 */
export function Analytics() {
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Analytics Dashboard"
        description="Track user engagement, feature usage, and community activity to improve Mamabot."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={String(s.value)}
            change={s.change}
            positive={s.positive}
            icon={s.icon}
            bgClassName={s.bgClassName}
          />
        ))}
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-4">
          <h3 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">
            Daily Active Users (Last 7 Days)
          </h3>
          <DailyActiveUsersLineChart />
          <p className="mt-2 text-xs text-[var(--color-primary)]">Active Users</p>
        </Card>

        <Card className="p-4">
          <h3 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">
            Feature Engagement (Today)
          </h3>
          <FeatureEngagementChart />
          <p className="mt-2 text-xs text-[var(--color-primary)]">Interactions</p>
        </Card>
      </div>

      <Card className="mb-8 p-4">
        <h3 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">
          User Activity by Phase (Last 4 Weeks)
        </h3>
        <div className="flex h-40 items-end justify-around gap-4">
          {userActivityByPhaseData.map(({ pregnancy, postpartum }, i) => (
            <div key={`w-${i}`} className="flex flex-1 items-end justify-center gap-1">
              <div
                className="w-1/2 rounded-t bg-[var(--color-primary)]"
                style={{ height: `${(pregnancy / Y_MAX_PHASE) * 100}%` }}
                title="Pregnancy"
              />
              <div
                className="w-1/2 rounded-t bg-[var(--color-secondary)]"
                style={{ height: `${(postpartum / Y_MAX_PHASE) * 100}%` }}
                title="Postpartum"
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-around gap-4 text-[10px] text-gray-500">
          {userActivityByPhaseData.map((_, i) => (
            <span key={i} className="flex-1 text-center">Week {i + 1}</span>
          ))}
        </div>
        <div className="mt-1 flex justify-center gap-6 text-xs">
          <span className="text-[var(--color-primary)]">Pregnancy</span>
          <span className="text-[var(--color-secondary)]">Postpartum</span>
        </div>
      </Card>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {dailySummaryCards.map((c) => (
          <Card key={c.label} className={`p-4 ${c.color}`}>
            <p className="mb-1 text-sm text-gray-600">{c.label}</p>
            <p className={`text-2xl font-bold ${c.valueColor}`}>{c.value}</p>
          </Card>
        ))}
      </div>

      <section>
        <PageTitle as={2}>Key Insights</PageTitle>
        <div className="mt-4 space-y-3">
          {keyInsights.map((insight) => (
            <div
              key={insight.label}
              className={`rounded-lg border border-gray-100 p-4 ${insight.bg}`}
            >
              <p className={`font-medium ${insight.textColor}`}>{insight.label}</p>
              <p className={`mt-1 text-sm ${insight.textColor}`}>{insight.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
