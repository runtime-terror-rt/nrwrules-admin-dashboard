import { Button, Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Testimonials — Figma node 3956-20269. Manage testimonials displayed on site.
 */
export function CmsTestimonials() {
  return (
    <>
      <PageHeader
        title="Testimonials"
        subtitle="CMS · Testimonials"
        description="Manage testimonials displayed on your landing page."
        action={
          <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" size={18} />
              Add Testimonial
            </span>
          </Button>
        }
      />

      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Add Testimonial</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Author Name</label>
            <input type="text" placeholder="e.g. Jessica Doe" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Role / Title</label>
            <input type="text" placeholder="e.g. CEO at MedTech" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Quote</label>
            <textarea rows={4} placeholder="Enter testimonial quote..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]">
              Click or drag image here
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">Cancel</button>
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Save Testimonial</button>
        </div>
      </Card>

      <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">Current Testimonials</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'Jessica Doe', role: 'CEO at MedTech', quote: 'Mamabot revolutionized our patient intake process.' },
          { name: 'Dr. Sarah Smith', role: 'Chief Medical Officer', quote: 'Essential tool for postpartum care.' },
        ].map((t) => (
          <Card key={t.name} className="flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 rounded-full bg-gray-200" aria-hidden />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-[var(--color-primary)]">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </div>
            </div>
            <p className="text-sm text-gray-600">&ldquo;{t.quote}&rdquo;</p>
          </Card>
        ))}
      </div>
    </>
  )
}
