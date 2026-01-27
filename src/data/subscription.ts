/**
 * Static data for Subscription & Payment page — Figma node 4132-18896.
 */
export interface TransactionRow {
  id: string
  provider: string
  card: string
  invoice: string
  amount: string
  status: string
  issuedAt: string
}

export interface UserSubscriptionCard {
  id: string
  userName: string
  plan: string
  started: string
  expires: string
  status: 'Active' | 'Expired' | 'Cancelled'
}

export const transactionLedgerRows: TransactionRow[] = [
  {
    id: '1',
    provider: 'STRIPE',
    card: '**** 4242',
    invoice: 'INV-2026-001',
    amount: 'USD 99.99',
    status: 'Published',
    issuedAt: 'Jan 19, 2026 - 11:12 AM',
  },
  {
    id: '2',
    provider: 'STRIPE',
    card: '**** 1234',
    invoice: 'INV-2026-002',
    amount: 'EUR 9.99',
    status: 'Published',
    issuedAt: 'Jan 19, 2026 - 11:12 AM',
  },
]

export const userSubscriptionCards: UserSubscriptionCard[] = [
  {
    id: '1',
    userName: 'Jessica Doe',
    plan: 'MANIABOT PREMIUM (YEARLY)',
    started: '2026-01-01',
    expires: '2027-01-01',
    status: 'Active',
  },
  {
    id: '2',
    userName: 'Jessica Doe',
    plan: 'MANIABOT PREMIUM (YEARLY)',
    started: '2026-01-01',
    expires: '2027-01-01',
    status: 'Active',
  },
  {
    id: '3',
    userName: 'Jessica Doe',
    plan: 'MANIABOT PREMIUM (YEARLY)',
    started: '2026-01-01',
    expires: '2027-01-01',
    status: 'Active',
  },
]
