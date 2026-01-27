import type { IconName } from '../constants'

/**
 * Static data for Analytics page — Figma node 3575-11428.
 */
export interface StatItem {
  label: string
  value: number | string
  change: string
  positive: boolean
  icon?: IconName
  bgClassName?: string
}

export const analyticsStats: StatItem[] = [
  { label: 'Active Users Today', value: 25, change: '+12% from yesterday', positive: true, icon: 'users', bgClassName: 'bg-[#FEE3ED]' },
  { label: 'AI Chat Sessions', value: 42, change: '+8% from yesterday', positive: true, icon: 'chat', bgClassName: 'bg-[#E3F2FD]' },
  { label: 'Tasks Completed', value: 15, change: '+15% from yesterday', positive: true, icon: 'check', bgClassName: 'bg-[#E8F5E9]' },
  { label: 'Community Posts', value: 31, change: '-5% from yesterday', positive: false, icon: 'chart', bgClassName: 'bg-[#FEE3ED]' },
]

/** Y-values for Daily Active Users (Last 7 Days), Jan 8–14, axis 0–300 */
export const dailyActiveUsersData: number[] = [120, 180, 150, 220, 200, 250, 280]

/** Feature Engagement (Today): label and value, Y-axis 0–600, hot pink bars */
export const featureEngagementData: { label: string; value: number }[] = [
  { label: 'AI Chat', value: 450 },
  { label: 'Tasks Completed', value: 320 },
  { label: 'Mood Check', value: 380 },
  { label: 'Recommendations', value: 520 },
  { label: 'Community Posts', value: 280 },
]

/** User Activity by Phase (Last 4 Weeks): pregnancy and postpartum, Y 0–600 */
export const userActivityByPhaseData: { pregnancy: number; postpartum: number }[] = [
  { pregnancy: 420, postpartum: 380 },
  { pregnancy: 480, postpartum: 350 },
  { pregnancy: 520, postpartum: 400 },
  { pregnancy: 460, postpartum: 440 },
]

export const dailySummaryCards: { label: string; value: number; color: string; valueColor: string }[] = [
  { label: 'Mood Checks', value: 55, color: 'bg-[#FEE3ED]', valueColor: 'text-[var(--color-primary)]' },
  { label: 'Health Logs', value: 34, color: 'bg-[#E3F2FD]', valueColor: 'text-[var(--color-secondary)]' },
  { label: 'Recommendations Viewed', value: 42, color: 'bg-amber-50', valueColor: 'text-amber-600' },
]

export const keyInsights: { label: string; text: string; bg: string; textColor: string }[] = [
  {
    text: 'Personalized recommendations are viewed 412 times daily on average.',
    label: 'Most Used Feature',
    bg: 'bg-green-50',
    textColor: 'text-green-700',
  },
  {
    text: 'Active users have increased by 23% over the past week 2.',
    label: 'User Engagement Trend',
    bg: 'bg-blue-50',
    textColor: 'text-blue-700',
  },
  {
    text: '87 new community posts today with an average of 12 comments per post.',
    label: 'Community Activity',
    bg: 'bg-[#FEE3ED]',
    textColor: 'text-[var(--color-primary)]',
  },
]
