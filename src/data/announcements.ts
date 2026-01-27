/**
 * Static data for Announcements page — Figma node 3503-13257.
 */
export interface AnnouncementItem {
  id: string
  title: string
  sentOn: string
  target: string
  content: string
  effects: string[]
}

export const recentAnnouncements: AnnouncementItem[] = [
  {
    id: '1',
    title: 'New Recovery Tips Added',
    sentOn: '2026-01-12',
    target: 'All Users',
    content:
      "We've added new recovery tips for Week 4 postpartum. Check them out in your personalized recommendations!",
    effects: ['Shown as banner on Home Page', 'Displayed as in-app notification alert'],
  },
  {
    id: '2',
    title: 'Community Guidelines Update',
    sentOn: '2026-01-10',
    target: 'All Users',
    content:
      'Our community guidelines have been updated to ensure a safe and supportive environment for all members.',
    effects: ['Shown as banner on Home Page', 'Displayed as in-app notification alert'],
  },
]
