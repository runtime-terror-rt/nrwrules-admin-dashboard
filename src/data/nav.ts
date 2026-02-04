import type { NavItem } from '../types'

/** Route paths and nav config — single source of truth for sidebar + router */
export const ROUTES = {
  USER_MANAGEMENT: '/user-management',
  COMMUNITY: '/community',
  REPORTED_CONTENT: '/reported-content',
  ANNOUNCEMENTS: '/announcements',
  ANALYTICS: '/analytics',
  AI_RULES: '/ai-rules',
  CMS_WEB_SETTINGS: '/cms/web-settings',
  CMS_SERVICES: '/cms/services',
  // CMS_SUPPORT: '/cms/support',
  CMS_TESTIMONIALS: '/cms/testimonials',
  CMS_TEAM: '/cms/team',
  CMS_ARTICLES: '/cms/articles',
  CMS_OUR_MISSION: '/cms/our-mission',
  CMS_OUR_JOURNEY: '/cms/our-journey',
  CMS_ABOUT_US: '/cms/about-us',
  CMS_HERO: '/cms/hero',
  CMS_PAGE: '/cms/page',
  CMS_RELAXATION_AUDIO: '/cms/relaxation-audio',
  SUBSCRIPTION: '/subscription',
} as const

export const navItems: NavItem[] = [
  { id: 'user-mgmt', label: 'User Management', icon: 'users', path: ROUTES.USER_MANAGEMENT },
  { id: 'community', label: 'Community Monitoring', icon: 'chat', path: ROUTES.COMMUNITY },
  { id: 'reported', label: 'Reported Content', icon: 'warning', path: ROUTES.REPORTED_CONTENT },
  { id: 'announcements', label: 'Announcements', icon: 'bell', path: ROUTES.ANNOUNCEMENTS },
  { id: 'analytics', label: 'Analytics', icon: 'chart', path: ROUTES.ANALYTICS },
  { id: 'ai-rules', label: 'AI Rules', icon: 'brain', path: ROUTES.AI_RULES },
  {
    id: 'cms',
    label: 'CMS',
    icon: 'folder',
    path: ROUTES.CMS_WEB_SETTINGS,
    children: [
      { label: 'Web settings', path: ROUTES.CMS_WEB_SETTINGS },
      { label: 'Services', path: ROUTES.CMS_SERVICES },
      // { label: 'Support', path: ROUTES.CMS_SUPPORT },
      { label: 'Team', path: ROUTES.CMS_TEAM },
      { label: 'Testimonials', path: ROUTES.CMS_TESTIMONIALS },
      { label: 'Articles / Blog', path: ROUTES.CMS_ARTICLES },
      { label: 'Our Mission', path: ROUTES.CMS_OUR_MISSION },
      { label: 'Our Journey', path: ROUTES.CMS_OUR_JOURNEY },
      { label: 'About Us', path: ROUTES.CMS_ABOUT_US },
      { label: 'Hero Section', path: ROUTES.CMS_HERO },
      { label: 'Page Settings', path: ROUTES.CMS_PAGE },
      { label: 'Relaxation Audio', path: ROUTES.CMS_RELAXATION_AUDIO },
    ],
  },
  {
    id: 'subscription',
    label: 'Subscription & Payment',
    icon: 'credit',
    path: ROUTES.SUBSCRIPTION,
  },
]
