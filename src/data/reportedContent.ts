/** Reported Content summary stats from Figma */
export const reportedStats = [
  { label: 'Pending Review', value: 3, color: 'pink' as const },
  { label: 'Approved', value: 1, color: 'green' as const },
  { label: 'Removed', value: 0, color: 'orange' as const },
]

export interface PendingReport {
  reporter: string
  tag: string
  tagVariant: 'spam' | 'misinformation' | 'abusive'
  posted: string
  reportCount: number
  content: string
  highlight?: string
}

export const pendingReports: PendingReport[] = [
  {
    reporter: 'Spam Account',
    tag: 'spam',
    tagVariant: 'spam',
    posted: '2026-01-11 03:30 PM',
    reportCount: 8,
    content:
      'This product changed my life! Buy now at [suspicious link]. Limited time offer!',
    highlight: '[suspicious link]',
  },
  {
    reporter: 'Anonymous User',
    tag: 'misinformation',
    tagVariant: 'misinformation',
    posted: '2026-01-11 02:15 PM',
    reportCount: 15,
    content:
      "Vaccines during pregnancy are dangerous and you should avoid them at all costs. Big pharma doesn't want you to know...",
  },
  {
    reporter: 'Judgmental User',
    tag: 'abusive',
    tagVariant: 'abusive',
    posted: '2026-01-10 11:00 AM',
    reportCount: 12,
    content:
      'This product changed my life! Buy now at [suspicious link]. Limited time offer!',
    highlight: '[suspicious link]',
  },
]

export interface ReviewedItem {
  reporter: string
  status: 'Approved' | 'Removed'
  posted: string
  content: string
}

export const recentlyReviewed: ReviewedItem[] = [
  {
    reporter: 'Helpful Mom',
    status: 'Approved',
    posted: '2026-01-08 09:00 AM',
    content: 'Check out my new blog post about pregnancy nutrition!',
  },
]
