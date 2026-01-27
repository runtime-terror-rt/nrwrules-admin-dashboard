import { Button, Card, PageHeader } from '../../components'

/**
 * CMS About Us — Figma node 4028-3566. Title, Subtitle, Content, Image URL uploads.
 */
export function CmsAboutUs() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="CMS · About Us"
        description="Manage the About Us section content and images."
        action={<Button variant="primary" size="md" onClick={() => {}}>Save Changes</Button>}
      />

      <Card>
        <div className="space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. 500+ Clients"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Subtitle</label>
            <input
              type="text"
              placeholder="Main heading..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Content</label>
            <textarea
              rows={6}
              placeholder="Detail the significance of this milestone..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              readOnly
            />
            <div className="mt-2 flex flex-wrap gap-1 rounded-lg border border-gray-200 bg-gray-50 p-2">
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Bold">B</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Italic">I</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Underline">U</button>
              <span className="mx-1 border-l border-gray-200" aria-hidden />
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Align left">≡</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Align center">≡</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Align right">≡</button>
              <span className="mx-1 border-l border-gray-200" aria-hidden />
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="List">•</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Numbered list">1.</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Image">🖼</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Link">🔗</button>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Image URL</label>
            <div className="grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex h-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]"
                >
                  Click or Drag image here
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
