import {
  Sidebar,
  PageTitle,
  SearchInput,
  StatCard,
  UserDirectoryTable,
} from '../components'
import { navItems, adminDashboardStats, adminDashboardUsers, currentUser } from '../data'

/**
 * Standalone admin dashboard (sidebar + User Management content).
 * Prefer routed UserManagement + DashboardLayout for normal app flow.
 */
export function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar brand="Mamabot" navItems={navItems} user={currentUser} />
      <main className="flex-1 overflow-auto p-8">
        <PageTitle as={1}>User Management</PageTitle>
        <SearchInput
          placeholder="Search users by name or email..."
          className="mb-6 max-w-xl"
        />
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminDashboardStats.map((s) => (
            <StatCard
              key={s.label}
              label={s.label}
              value={s.value}
              change={s.change}
              positive={s.positive}
            />
          ))}
        </div>
        <PageTitle as={2}>User Directory</PageTitle>
        <UserDirectoryTable users={adminDashboardUsers} />
      </main>
    </div>
  )
}
