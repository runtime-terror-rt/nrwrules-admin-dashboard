import { Button, Card, Icon, PageHeader } from '../../components'

/**
 * CMS Hero Section — Figma node 4049-4269. Main Title, Subtitle, Description, Button text/link, Image URL.
 */
export function CmsHero() {
  return (
    <>
      <PageHeader
        title="Hero Section"
        subtitle="CMS · Hero"
        description="Customize the main landing banner."
        action={<Button variant="primary" size="md" onClick={() => {}} className="shrink-0"><span className="inline-flex items-center gap-2"><Icon name="check" size={18} /> Save Changes</span></Button>}
      />

      <Card>
        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">Content</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Main Title</label>
                <input
                  type="text"
                  defaultValue="Jessica Doe"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  defaultValue="CEO at MedTech"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  defaultValue="Mamabot revolutionized our patient intake process."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  readOnly
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">Settings</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Button text</label>
                <input
                  type="text"
                  defaultValue="Book Now"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Button link</label>
                <input
                  type="text"
                  defaultValue="http://xyzbuttontext"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                  readOnly
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-base font-semibold text-[var(--color-secondary)]">Image URL</h2>
            <div className="flex gap-6">
              <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-200" aria-hidden />
              <div className="flex min-h-24 flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-blue-50/50 text-sm text-[var(--color-primary)]">
                Click or drag image here
              </div>
            </div>
          </section>
        </div>
      </Card>
    </>
  )
}
