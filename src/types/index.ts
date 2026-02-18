/**
 * Shared type definitions for the nrwrules frontend.
 * Use these across components, hooks, and pages for consistency.
 */

import type { LucideIcon } from 'lucide-react'

/** User record as shown in the directory table */
export interface User {
  id?: string
  name: string
  email: string
  status: 'active' | 'deactivate'
  phase: string
  delivery: string
  lastActivity: string
  role?: 'user' | 'admin'
}

/** Sidebar nav child (e.g. CMS sub-items) */
export interface NavItemChild {
  label: string
  path: string
}

/** Navigation item for the sidebar */
export interface NavItem {
  id: string
  label: string
  icon: string 
  path: string
  children?: NavItemChild[]
}

/** Summary stat shown in dashboard cards */
export interface StatCardData {
  label: string
  value: number | string
  change: string
  positive: boolean
}

/** Current user shown in sidebar profile card */
export interface CurrentUser {
  name: string
  email: string
  avatarUrl?: string
}
