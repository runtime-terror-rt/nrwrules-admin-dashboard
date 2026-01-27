import { Button, Card, Icon, PageHeader, SearchInput } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Team — Figma node 3956-20269. Team Management: Add Team Member form + team member cards.
 */
export function CmsTeam() {
  return (
    <>
      <PageHeader
        title="Team Management"
        subtitle="CMS · Team"
        description="Manage your team members and their roles."
        action={
          <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
            <SearchInput placeholder="Search members..." className="sm:w-64" />
            <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
              <span className="inline-flex items-center gap-2">
                <Icon name="plus" size={18} />
                Add Member
              </span>
            </Button>
          </div>
        }
      />

      {/* Add Team Member form */}
      <Card className="mb-8">
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-secondary)]">Add Team Member</h2>
        <p className="mb-4 text-sm text-gray-600">Manage profile details and permissions.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" defaultValue="Dr. Sarah Smith" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Job Title / Role</label>
            <input type="text" defaultValue="Chief Medical Officer" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea rows={3} defaultValue="Experienced in paediatric care and AI integration." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Social Links</label>
            <div className="space-y-2">
              <input type="text" placeholder="Instagram" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
              <input type="text" placeholder="Facebook" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
              <input type="text" placeholder="TikTok" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]">
              Click or drag image here
            </div>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
              <span className="text-sm font-medium text-gray-700">Active status</span>
              <span className="h-6 w-11 rounded-full bg-[var(--color-primary)]" aria-hidden />
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">Cancel</button>
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Update</button>
        </div>
      </Card>

      {/* Team member cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'Dr. Sarah Smith', role: 'Chief Medical Officer', bio: 'Experienced in paediatric care and AI integration.' },
          { name: 'James Wilson', role: 'Head of AI', bio: 'Former Google DeepMind researcher.' },
          { name: 'Emily Chen', role: 'Lead Developer', bio: 'Full stack expert with focus on healthcare security.' },
        ].map((m) => (
          <Card key={m.name} className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="h-12 w-12 shrink-0 rounded-full bg-gray-200" aria-hidden />
                <div>
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <p className="text-sm text-[var(--color-primary)]">{m.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{m.bio}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
