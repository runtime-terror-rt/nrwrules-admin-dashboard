import { Button, Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Our Journey — Figma node 3997-23261. Manage journey/milestone content.
 */
export function CmsOurJourney() {
  return (
    <>
      <PageHeader
        title="Our Journey"
        subtitle="CMS · Our Journey"
        description="Manage journey milestones and company story."
        action={
          <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" size={18} />
              Add Milestone
            </span>
          </Button>
        }
      />

      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Create / Edit Milestone</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" placeholder="e.g. 500+ Clients" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea rows={4} placeholder="Enter milestone description..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="text" defaultValue="0" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]">
              Click or Drag image here
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Save Milestone</button>
          <button type="button" className="rounded-lg border border-orange-400 bg-white px-4 py-2 text-sm font-medium text-orange-600">Cancel</button>
        </div>
      </Card>

      <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Current Milestones</h2>
      <div className="space-y-4">
        {[
          { title: 'Company Founded', year: '2020', desc: 'Mamabot started with a mission to support new parents.' },
          { title: 'First 1000 Users', year: '2023', desc: 'Reached milestone with AI-powered recommendations.' },
        ].map((m) => (
          <Card key={m.title} className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">{m.title}</p>
              <p className="text-sm text-[var(--color-primary)]">{m.year}</p>
              <p className="mt-1 text-sm text-gray-600">{m.desc}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
              <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
