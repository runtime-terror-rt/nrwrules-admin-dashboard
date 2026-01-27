import { Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Our Mission — Figma node 3997-23261. Missions: Create/Edit Mission form, Current Missions list.
 */
export function CmsOurMission() {
  return (
    <>
      <PageHeader title="Missions" subtitle="CMS · Our Mission" description="Central control for Mamabot ecosystem." />

      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Create / Edit Mission</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Mission Title</label>
            <input type="text" placeholder="e.g., New Features Available" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea rows={4} placeholder="Enter content description..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input type="text" defaultValue="0" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Icon URL</label>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]">
              Click or Drag image here
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Save Mission</button>
          <button type="button" className="rounded-lg border border-orange-400 bg-white px-4 py-2 text-sm font-medium text-orange-600">Cancel</button>
        </div>
      </Card>

      <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Current Missions</h2>
      <div className="space-y-4">
        {[
          { num: '01', title: 'Hydration Hero', desc: 'Mamabot revolutionized our patient intake process.' },
          { num: '02', title: 'Hydration Hero', desc: 'Mamabot revolutionized our patient intake process.' },
        ].map((m, i) => (
          <Card key={i} className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-500">{m.num}.</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-blue-100 text-[var(--color-primary)]" aria-hidden><Icon name="heart" size={16} primary /></span>
              <div>
                <p className="font-semibold text-[var(--color-primary)]">{m.title}</p>
                <p className="text-sm text-gray-600">&ldquo;{m.desc}&rdquo;</p>
              </div>
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
