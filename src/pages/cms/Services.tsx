import { Button, Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Services — Figma node 3924-18987. Our Services: table + Edit Service form.
 */
export function CmsServices() {
  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="CMS · Services"
        description="Manage the services displayed on your landing page."
        action={
          <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icon name="plus" size={18} />
              Add New Service
            </span>
          </Button>
        }
      />

      {/* Services table */}
      <div
        className="mb-8 overflow-hidden rounded-xl border border-gray-200"
        style={{ boxShadow: theme.shadow.card }}
      >
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Service</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Slug</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Status</th>
              <th className="bg-[var(--color-table-header)] px-4 py-3 font-semibold uppercase tracking-wider text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-10 w-10 shrink-0 rounded bg-gray-200" aria-hidden />
                  AI Consultation
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">/ai-consultation</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">Active</span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </td>
            </tr>
            <tr className="bg-[#FDF1F5]">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-10 w-10 shrink-0 rounded bg-gray-200" aria-hidden />
                  Process Automation
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">/process-automation</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Draft</span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-10 w-10 shrink-0 rounded bg-gray-200" aria-hidden />
                  Data Analytics
                </div>
              </td>
              <td className="px-4 py-3 text-gray-600">/data-analytics</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">Draft</span>
              </td>
              <td className="px-4 py-3 flex gap-2">
                <button type="button" className="p-1.5 text-gray-400 hover:text-[var(--color-primary)]" aria-label="Edit"><Icon name="edit" size={18} /></button>
                <button type="button" className="p-1.5 text-gray-400 hover:text-red-500" aria-label="Delete"><Icon name="trash" size={18} /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Edit Service form */}
      <Card>
        <h2 className="mb-1 text-lg font-semibold text-[var(--color-secondary)]">Edit Service</h2>
        <p className="mb-4 text-sm text-gray-600">Configure the service details below.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Service Title</label>
            <input type="text" defaultValue="AI Consultation" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">URL Slug</label>
            <input type="text" defaultValue="ai-consultation" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Short Description</label>
            <textarea rows={3} defaultValue="Expert guidance on implementing AI." className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Thumbnail Image</label>
            <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-sm text-[var(--color-primary)]">
              Click or drag image here
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Settings</label>
              <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <span className="text-sm">Active status</span>
                <span className="h-6 w-11 rounded-full bg-blue-500" aria-hidden />
              </div>
              <div className="mt-2 flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <span className="text-sm">Featured on Home</span>
                <span className="h-6 w-11 rounded-full bg-gray-300" aria-hidden />
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700">Button text</label>
            <input type="text" defaultValue="Book Now" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
            <label className="block text-sm font-medium text-gray-700">Button link</label>
            <input type="text" defaultValue="http//xyzbuttontext" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" readOnly />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">Cancel</button>
          <button type="button" className="rounded-lg px-4 py-2 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>Update Service</button>
        </div>
      </Card>
    </>
  )
}
