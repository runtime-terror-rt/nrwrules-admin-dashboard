import { Button, Card, Icon, PageHeader } from '../../components'
import { theme } from '../../constants'

/**
 * CMS Support — Figma node 3924-18422. Configure Support Channel + Active Support Channels.
 */
export function CmsSupport() {
  return (
    <>
      <PageHeader
        title="Support"
        subtitle="CMS · Support"
        description="Manage support channels and contact options."
        action={
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <Button variant="secondary" size="md" onClick={() => {}} className="w-full sm:w-auto order-2 sm:order-1">
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={() => {}} className="w-full sm:w-auto order-1 sm:order-2">
              Save All Changes
            </Button>
          </div>
        }
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <h2 className="mb-4 text-lg font-semibold ">Configure Support Channel</h2>
            <label className="mb-2 block text-xs font-medium uppercase text-gray-500">
              Select icon
            </label>
            <div className="mb-4 flex gap-2">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FEE3ED] text-[var(--color-primary)]"
                aria-hidden
              >
                🎧
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                📞
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                ✉
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                💬
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-400">
                🕐
              </span>
              <button
                type="button"
                className="rounded-lg border border-[var(--color-primary)] bg-[#FDF1F5] px-3 py-2 text-sm font-medium text-[var(--color-primary)]"
              >
                Upload Icon
              </button>
            </div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Support Title</label>
            <input
              placeholder="e.g. 24/7 Medical Support"
              className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              readOnly
            />
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              placeholder="Provide details about this support channel..."
              className="mb-4 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              readOnly
            />
            <button
              type="button"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: theme.color.primary }}
            >
              + Add Support Channel
            </button>
          </Card>
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-secondary)]">
            Active Support Channels
          </h2>
          <div className="space-y-3">
            <Card className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEE3ED] text-[var(--color-primary)]"
                aria-hidden
              >
                <Icon name="message" size={20} primary />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">24/7 Support</p>
                <p className="text-sm text-gray-600">Reach out to our medical team...</p>
              </div>
              <button
                type="button"
                className="p-1.5 text-gray-400 hover:text-red-500"
                aria-label="Delete"
              >
                <Icon name="trash" size={18} />
              </button>
            </Card>
            <Card className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FEE3ED] text-[var(--color-primary)]"
                aria-hidden
              >
                <Icon name="message" size={20} primary />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">Mamabot Community</p>
                <p className="text-sm text-gray-600">Join fellow moms in our moderated...</p>
              </div>
              <button
                type="button"
                className="p-1.5 text-gray-400 hover:text-red-500"
                aria-label="Delete"
              >
                <Icon name="trash" size={18} />
              </button>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
