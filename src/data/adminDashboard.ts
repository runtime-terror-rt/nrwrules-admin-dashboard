import type { StatCardData, User, CurrentUser } from '../types'

/** Stats from Figma: Total Users, Active Users, AI Chat Logs, Postpartum Segment */
export const adminDashboardStats: StatCardData[] = [
  { label: 'Total Users', value: 40, change: '+5.2%', positive: true },
  { label: 'Active Users', value: 20, change: '+50%', positive: true },
  { label: 'AI Chat Logs', value: 13, change: '+18.7%', positive: true },
  { label: 'Postpartum Segment', value: '45%', change: '-2.2%', positive: false },
]

/** User directory rows in exact Figma order */
export const adminDashboardUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    status: 'active',
    phase: 'Pregnancy (Week 24)',
    delivery: '—',
    lastActivity: '2026-01-14',
    role: 'user',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.g@email.com',
    status: 'active',
    phase: 'Postpartum (Week 3)',
    delivery: 'Cesarean',
    lastActivity: '2026-01-14',
    role: 'admin',
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily.c@email.com',
    status: 'deactivate',
    phase: 'Pregnancy (Week 16)',
    delivery: '—',
    lastActivity: '2026-01-14',
    role: 'user',
  },
  {
    id: '4',
    name: 'Jessica Williams',
    email: 'jessica.w@email.com',
    status: 'active',
    phase: 'Postpartum (Week 6)',
    delivery: 'Vaginal',
    lastActivity: '2026-01-14',
    role: 'user',
  },
]

/** Current user for sidebar profile */
export const currentUser: CurrentUser = {
  name: 'Sarah Collins',
  email: 'sarah@mamabot.com',
}
