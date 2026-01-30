/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, PageHeader, PageTitle, StatCard } from '../components'
import { dailySummaryCards, keyInsights, userActivityByPhaseData, type StatItem } from '../data'
import { useGetAnalyticsDataQuery } from '../redux/features/api/admin/communityMonitoring'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'

const Y_MAX_PHASE = 600

function DailyActiveUsersLineChart({ data }: { data: number[] }) {
  return (
    <LineChart
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '400px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" name="Active Users" stroke="#E91E63" />

      <RechartsDevtools />
    </LineChart>
  )
}

function FeatureEngagementChart({ data }: { data: number[] }) {
  return (
    <BarChart
      style={{ width: '100%', maxWidth: '100%', maxHeight: '400px', aspectRatio: 1.618 }}
      responsive
      data={data}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="uv" name="Interactions" fill="#E91E63" />
      <RechartsDevtools />
    </BarChart>
  )
}

export function Analytics() {
  const { data } = useGetAnalyticsDataQuery({})
  const analyticsStats: StatItem[] = [
    {
      label: 'Active Users',
      value: data?.summary?.active_users.current,
      change: `${data?.summary?.active_users.growth} from yesterday`,
      positive: true,
      icon: 'users',
      bgClassName: 'bg-[#FEE3ED]',
    },
    {
      label: 'AI Chat Sessions',
      value: data?.summary?.ai_chats.current,
      change: `${data?.summary?.ai_chats.growth} from yesterday`,
      positive: true,
      icon: 'chat',
      bgClassName: 'bg-[#E3F2FD]',
    },
    {
      label: 'Community Posts',
      value: data?.summary?.posts.current,
      change: `${data?.summary?.posts.growth} from yesterday`,
      positive: true,
      icon: 'check',
      bgClassName: 'bg-[#E8F5E9]',
    },
  ]

  const lineChartData = data?.line_chart.map((item: any) => ({
    name: item.label,
    pv: item.value,
  }))

  const barChartData = data?.bar_chart.map((item: any) => ({
    name: item.feature,
    uv: item.count,
  }))

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

      <div className="mb-8 grid gap-6 grid-cols-1">
        <Card className="p-4">
          <h3 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">
            Daily Active Users (Last 7 Days)
          </h3>
          <DailyActiveUsersLineChart data={lineChartData} />
          <p className="mt-2 text-xs text-[var(--color-primary)]">Active Users</p>
        </Card>

        <Card className="p-4">
          <h3 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">
            Feature Engagement (Today)
          </h3>
          <FeatureEngagementChart data={barChartData} />
        </Card>
      </div>

      {/* ------------------------ */}
      {/* from below section, these api is not ready yet */}
      {/* ------------------------ */}

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
            <span key={i} className="flex-1 text-center">
              Week {i + 1}
            </span>
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
