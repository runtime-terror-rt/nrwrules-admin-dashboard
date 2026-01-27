import { Button, Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Articles/Blog — Figma node 3902-17425. Create New Content form, tabs, article list.
 */
export function CmsArticles() {
  return (
    <>
      <PageHeader
        title="Articles / Blog Management"
        subtitle="CMS · Articles"
        description="Create and manage educational content, recovery guides, and articles."
        action={
          <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" size={18} />
              New Content
            </span>
          </Button>
        }
      />

      <div className="mb-6 rounded-lg border border-gray-200 bg-[#FDF1F5] p-4 text-sm text-gray-700">
        <p className="font-medium text-gray-900">Effect on Mamabot Website</p>
        <ul className="mt-1 list-inside list-disc text-gray-600">
          <li>Appears in Blog page</li>
          <li>Shown in Recommended Articles section</li>
          <li>Used in AI-powered content suggestions</li>
        </ul>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800">All Posts</button>
        <button type="button" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600">Published (4)</button>
        <button type="button" className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600">Draft (1)</button>
      </div>

      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Create New Content</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Title</label>
            <input type="text" placeholder="e.g., New Features Available" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea rows={2} placeholder="Enter content description.." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Category</label>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm">
              <span>Education</span>
              <span className="text-red-500" aria-hidden>×</span>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Phase</label>
            <input type="text" defaultValue="Pregnancy" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Publish Status</label>
            <input type="text" defaultValue="Draft" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Create Content</button>
          <button type="button" className="rounded-lg border border-orange-400 bg-white px-4 py-2 text-sm font-medium text-orange-600">Cancel</button>
        </div>
      </Card>

      <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Articles</h2>
      <div className="space-y-4">
        {[
          { title: 'Understanding First Trimester Change', category: 'Education', description: 'A guide to physical and emotional changes.', phase: 'Pregnancy', created: '2026-01-10', status: 'Published' as const },
          { title: 'Week 4 Recovery Tips', category: 'Recovery', description: 'Postpartum recovery guidelines.', phase: 'Postpartum', created: '2026-01-09', status: 'Draft' as const },
        ].map((a) => (
          <Card key={a.title} className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">{a.title}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">{a.category}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{a.description}</p>
                <p className="mt-1 text-xs text-gray-500">Phase: {a.phase} · Created: {a.created} · <span className={a.status === 'Published' ? 'text-green-600' : 'text-blue-600'}>{a.status}</span></p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="View"><Icon name="external-link" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
