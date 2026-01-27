import { Button, Card, Icon, Input, PageHeader, PageTitle } from '../components'
import { theme } from '../constants'
import { recentAnnouncements, type AnnouncementItem } from '../data'

/**
 * Announcements — Figma node 3503-13257.
 * Title/subtitle/description, New Announcement button, Create form, Recent list.
 */
export function Announcements() {
  return (
    <>
      <PageHeader
        title="Announcements"
        subtitle="Announcements & Notifications"
        description="Send announcements to all Mamabot users"
        action={
          <Button variant="primary" size="md" onClick={() => {}} className="shrink-0">
            <span className="inline-flex items-center gap-2">
              <Icon name="bell" size={20} />
              New Announcement
            </span>
          </Button>
        }
      />

      <section className="mb-10">
        <PageTitle as={2}>Create New Announcement</PageTitle>
        <Card className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Announcement Title
            </label>
            <Input placeholder="e.g., New Features Available" className="border" style={{ borderColor: theme.color.activeNav, backgroundColor: theme.color.sidebar }} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              placeholder="Enter your announcement message..."
              rows={4}
              className="w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              style={{ borderColor: theme.color.activeNav, backgroundColor: theme.color.sidebar }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Target Audience
            </label>
            <div className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-lg border px-4 py-2.5" style={{ borderColor: theme.color.activeNav, backgroundColor: theme.color.sidebar }}>
              <span className="rounded-full px-3 py-1 text-sm font-medium text-white" style={{ backgroundColor: theme.color.primary }}>
                All Mamabot Users
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="primary" size="md" onClick={() => {}}>
              <span className="flex items-center gap-2">
                <Icon name="bell" size={20} />
                Send Announcement
              </span>
            </Button>
            <button
              type="button"
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100"
              onClick={() => {}}
            >
              Cancel
            </button>
          </div>
        </Card>
      </section>

      <section>
        <PageTitle as={2}>Recent Announcements</PageTitle>
        <div className="mt-4 space-y-4">
          {recentAnnouncements.map((a) => (
            <AnnouncementCard key={a.id} item={a} />
          ))}
        </div>
      </section>
    </>
  )
}

function AnnouncementCard({ item }: { item: AnnouncementItem }) {
  return (
    <Card className="relative pr-10">
      <button
        type="button"
        className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-orange-500"
        aria-label="Delete"
      >
        <Icon name="trash" size={20} />
      </button>
      <h3 className="font-semibold text-gray-900">{item.title}</h3>
      <p className="mt-1 text-sm text-gray-600">
        Sent on {item.sentOn}{' '}
        <span style={{ color: theme.color.primary }}>Target: {item.target}</span>
      </p>
      <p className="mt-2 text-sm text-gray-700">{item.content}</p>
      <div className="mt-3">
        <p className="text-xs font-medium text-gray-500">Effect on Mamabot Website</p>
        <ul className="mt-1 list-inside list-disc text-sm text-gray-600">
          {item.effects.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>
    </Card>
  )
}
