/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Input,
  Modal,
  PageHeader,
  PageTitle,
  SearchInput,
  StatCard,
  UserDirectoryTable,
} from '../components'
import { theme } from '../constants'
import { adminDashboardStats, adminDashboardUsers } from '../data'
import type { User } from '../types'
import {
  useGetDashboardCardsDataQuery,
  useGetDashboardUsersQuery,
  useToggleUserStatusMutation,
} from '../redux/features/api/admin/userManagement'
import SkeletonLoading from '@/components/SkeletonLoading'

type FilterStatus = 'all' | 'active' | 'deactivate'
type FilterPhase = 'all' | 'pregnancy' | 'postpartum'
type FilterDelivery = 'all' | 'vaginal' | 'cesarean' | '—'

interface BackendUser {
  user_id: number
  pregnancy_status: string
  delivery_type: string | null
  user: {
    first_name: string
    last_name: string
    email: string
    is_blocked: boolean
    last_seen: string | null
    role?: string
  }
}

/**
 * User Management — Figma node 3468-1203.
 * Stats, search, filters, Add User, User Directory table. Click member → details modal.
 */
export function UserManagement() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [filterPhase, setFilterPhase] = useState<FilterPhase>('all')
  const [filterDelivery, setFilterDelivery] = useState<FilterDelivery>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const { data: dashboardCardsData, isLoading: isLoadingDashboardCardsData } =
    useGetDashboardCardsDataQuery({})
  const { data: allUsers, isLoading: isLoadingAllUsers } = useGetDashboardUsersQuery({})
  const [toggleUserStatus] = useToggleUserStatusMutation()
  const [localUsers, setLocalUsers] = useState<User[]>([])

  useEffect(() => {
    if (allUsers?.data) {
      const mappedUsers = allUsers.data.map((item: BackendUser) => ({
        id: String(item.user_id),
        name: `${item.user?.first_name || ''} ${item.user?.last_name || ''}`.trim() || 'Anonymous',
        email: item.user?.email || 'N/A',
        status: item.user?.is_blocked ? 'deactivate' : 'active',
        phase: item.pregnancy_status || '—',
        delivery: item.delivery_type || '—',
        lastActivity: item.user?.last_seen
          ? new Date(item.user.last_seen).toLocaleDateString('en-GB')
          : '—',
        role: (item.user?.role?.toLowerCase() === 'admin' ? 'admin' : 'user') as 'admin' | 'user',
      }))
      setLocalUsers(mappedUsers)
    } else {
      setLocalUsers(adminDashboardUsers)
    }
  }, [allUsers])

  const displayStats = useMemo(() => {
    if (!dashboardCardsData?.data) return adminDashboardStats
    return [
      { ...adminDashboardStats[0], value: dashboardCardsData.data.total_users ?? 0 },
      { ...adminDashboardStats[1], value: dashboardCardsData.data.active_users ?? 0 },
      { ...adminDashboardStats[2], value: dashboardCardsData.data.ai_chat_logs ?? 0 },
      {
        ...adminDashboardStats[3],
        value: `${dashboardCardsData.data.postpartum_percentage ?? 0}`,
      },
    ]
  }, [dashboardCardsData])

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    return localUsers.filter((u) => {
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
      if (filterStatus !== 'all' && u.status !== filterStatus) return false
      if (filterPhase === 'pregnancy' && !u.phase.toLowerCase().includes('pregnancy')) return false
      if (filterPhase === 'postpartum' && !u.phase.toLowerCase().includes('postpartum'))
        return false
      if (filterDelivery !== 'all') {
        const d = u.delivery.toLowerCase()
        if (filterDelivery === '—' && d !== '—') return false
        if (filterDelivery === 'vaginal' && d !== 'vaginal') return false
        if (filterDelivery === 'cesarean' && d !== 'cesarean') return false
      }
      return true
    })
  }, [localUsers, search, filterStatus, filterPhase, filterDelivery])

  const handleDeleteUser = (user: User) => {
    setLocalUsers((prev) => prev.filter((u) => (u.id ?? u.email) !== (user.id ?? user.email)))
    setSelectedUser(null)
  }

  const handleMakeAdmin = (user: User) => {
    setLocalUsers((prev) =>
      prev.map((u) =>
        (u.id ?? u.email) === (user.id ?? user.email)
          ? { ...u, role: (u.role === 'admin' ? 'user' : 'admin') as 'user' | 'admin' }
          : u
      )
    )
    setSelectedUser((u) => (u ? { ...u, role: u.role === 'admin' ? 'user' : 'admin' } : null))
  }

  const handleToggleStatus = (user: any) => {
    toggleUserStatus(user.id)
    setSelectedUser((u) =>
      u ? { ...u, status: u.status === 'active' ? 'deactivate' : 'active' } : null
    )
  }

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value
    if (!name || !email) return
    setLocalUsers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name,
        email,
        status: 'active',
        phase: 'Pregnancy (Week 0)',
        delivery: '—',
        lastActivity: new Date().toISOString().slice(0, 10),
        role: 'user',
      },
    ])
    setShowAddModal(false)
    form.reset()
  }

  return (
    <>
      <PageHeader title="User Management" description="Manage users, roles, and access." />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Search users by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-[220px] max-w-xl flex-1"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          aria-label="Filter by status"
        >
          <option value="all">All status</option>
          <option value="active">Active</option>
          <option value="deactivate">Deactivate</option>
        </select>
        <select
          value={filterPhase}
          onChange={(e) => setFilterPhase(e.target.value as FilterPhase)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          aria-label="Filter by phase"
        >
          <option value="all">All phases</option>
          <option value="pregnancy">Pregnancy</option>
          <option value="postpartum">Postpartum</option>
        </select>
        <select
          value={filterDelivery}
          onChange={(e) => setFilterDelivery(e.target.value as FilterDelivery)}
          className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          aria-label="Filter by delivery"
        >
          <option value="all">All delivery</option>
          <option value="vaginal">Vaginal</option>
          <option value="cesarean">Cesarean</option>
          <option value="—">—</option>
        </select>
      </div>

      {isLoadingDashboardCardsData ? (
        <SkeletonLoading count={4} />
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {displayStats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              change={s.change}
              positive={s.positive}
            />
          ))}
        </div>
      )}

      <PageTitle as={2}>User Directory</PageTitle>
      <UserDirectoryTable
        users={filteredUsers}
        onRowClick={setSelectedUser}
        toggleUserStatus={handleToggleStatus}
      />

      {/* User details modal — view details, Edit / Delete / Make Admin / Deactivate */}
      <Modal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser ? `${selectedUser.name} — Details` : ''}
      >
        {selectedUser && (
          <div className="space-y-4">
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="font-medium text-[var(--color-text-secondary)]">Name</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedUser.name}</dd>
              <dt className="font-medium text-[var(--color-text-secondary)]">Email</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedUser.email}</dd>
              <dt className="font-medium text-[var(--color-text-secondary)]">Status</dt>
              <dd>{selectedUser.status === 'active' ? 'Active' : 'Deactivate'}</dd>
              <dt className="font-medium text-[var(--color-text-secondary)]">Role</dt>
              <dd>{selectedUser.role === 'admin' ? 'Admin' : 'User'}</dd>
              <dt className="font-medium text-[var(--color-text-secondary)]">Phase</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedUser.phase}</dd>
              <dt className="font-medium text-[var(--color-text-secondary)]">Delivery</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedUser.delivery}</dd>
              <dt className="font-medium text-[var(--color-text-secondary)]">Last activity</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedUser.lastActivity}</dd>
            </dl>
            <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              <Button variant="primary" size="sm" type="button">
                Edit
              </Button>
              <Button
                variant={selectedUser.status === 'active' ? 'danger' : 'success'}
                size="sm"
                type="button"
                onClick={() => handleToggleStatus(selectedUser)}
              >
                {selectedUser.status === 'active' ? 'Deactivate' : 'Activate'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => handleMakeAdmin(selectedUser)}
              >
                {selectedUser.role === 'admin' ? 'Remove admin' : 'Make admin'}
              </Button>
              <Button
                variant="danger"
                size="sm"
                type="button"
                onClick={() => handleDeleteUser(selectedUser)}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add user modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add user">
        <form onSubmit={handleAddUser} className="space-y-4">
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: theme.color.textPrimary }}
            >
              Name
            </label>
            <Input name="name" placeholder="Full name" required />
          </div>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: theme.color.textPrimary }}
            >
              Email
            </label>
            <Input name="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="submit" variant="primary">
              Add user
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
