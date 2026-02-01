import type { StatCardData, User, CurrentUser } from '../types'

/** Stats from Figma: Total Users, Active Users, AI Chat Logs, Postpartum Segment */
export const adminDashboardStats: StatCardData[] = [
  { label: 'Total Users', value: 0, change: '+5.2%', positive: true },
  { label: 'Active Users', value: 0, change: '+50%', positive: true },
  { label: 'AI Chat Logs', value: 0, change: '+18.7%', positive: true },
  { label: 'Postpartum Segment', value: '0%', change: '-2.2%', positive: false },
]

/** User directory rows in exact Figma order */
export const adminDashboardUsers: User[] = []

/** Current user for sidebar profile */
export const currentUser: CurrentUser = {
  name: 'Sarah Collins',
  email: 'sarah@mamabot.com',
}
