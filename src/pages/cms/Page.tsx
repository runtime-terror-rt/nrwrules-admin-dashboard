import { Button, Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Page Settings — Figma node 4076-7800. Pages table + Edit page form.
 */
export function CmsPage() {
  return (
    <>
      <PageHeader
        title="Pages"
        subtitle="CMS · Page Settings"
        description="Manage static pages and SEO."
        action={
          <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" size={18} />
              Add New Page
            </span>
          </Button>
        }
      />

      {/* Pages table */}
      <div
        className="mb-8 overflow-hidden rounded-xl border border-gray-200"
        style={{ boxShadow: theme.shadow.card }}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Title</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Slug</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Status</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Last Updated</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-3 font-medium text-gray-900">Privacy Policy</td>
              <td className="px-4 py-3 text-gray-600">/privacy</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Published</span>
              </td>
              <td className="px-4 py-3 text-gray-600">2 days ago</td>
              <td className="px-4 py-3 flex gap-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </td>
            </tr>
            <tr className="bg-[#FDF1F5]">
              <td className="px-4 py-3 font-medium text-gray-900">Terms of Service</td>
              <td className="px-4 py-3 text-gray-600">/terms</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Published</span>
              </td>
              <td className="px-4 py-3 text-gray-600">1 month ago</td>
              <td className="px-4 py-3 flex gap-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit page form */}
      <Card>
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-secondary)]">Edit page</h2>
        <p className="mb-4 text-sm text-gray-600">Manage static content and SEO.</p>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Page Title</label>
            <input type="text" defaultValue="Privacy Policy" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <input type="text" defaultValue="privacy" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea rows={6} placeholder="Enter markdown or HTML content..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <div className="flex flex-wrap gap-1 rounded-lg border border-gray-200 bg-gray-50 p-2">
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Bold">B</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Italic">I</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Underline">U</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Strikethrough">S</button>
              <span className="mx-1 border-l border-gray-200" aria-hidden />
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="List">•</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Code">&lt;/&gt;</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Image">🖼</button>
              <button type="button" className="rounded p-1.5 text-gray-500 hover:bg-gray-200" aria-label="Link">🔗</button>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-800">Publishing Settings</h3>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
              <input type="text" defaultValue="Published" className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <span className="text-sm font-medium text-gray-700">Active status</span>
                <span className="h-6 w-11 rounded-full bg-blue-500" aria-hidden />
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-800">SEO Configuration</h3>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Title</label>
              <input type="text" defaultValue="Privacy Policy - Mamabot" className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Meta Description</label>
              <input type="text" placeholder="Search engine description..." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">Cancel</button>
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Update</button>
        </div>
      </Card>
    </>
  )
}
