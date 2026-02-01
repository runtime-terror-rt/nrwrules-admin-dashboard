/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateAnnouncementMutation,
  useGetAnnouncementsQuery,
} from '@/redux/features/api/admin/communityMonitoring'
import { Button, Card, Input, PageHeader, PageTitle } from '../components'
import { theme } from '../constants'
import { Bell, Send } from 'lucide-react'
import SkeletonLoading from '@/components/SkeletonLoading'
import { useState } from 'react'
import { toast } from 'sonner'

/**
 * Announcements — Figma node 3503-13257.
 * Title/subtitle/description, New Announcement button, Create form, Recent list.
 */
export function Announcements() {
  const { data, isLoading } = useGetAnnouncementsQuery({})
  const [createAnnouncement, { isLoading: isCreating }] = useCreateAnnouncementMutation()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleCreateAnnouncement = () => {
    createAnnouncement({ title, message })
    setTitle('')
    setMessage('')
    toast.success('Announcement created successfully')
  }
  return (
    <>
      <PageHeader
        title="Announcements"
        subtitle="Announcements & Notifications"
        description="Send announcements to all Mamabot users"
      />

      <section className="mb-10">
        <PageTitle className="text-black!" as={2}>
          Create New Announcement
        </PageTitle>
        <Card className="mt-4 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Announcement Title
            </label>
            <Input
              placeholder="e.g., New Features Available"
              className="border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ borderColor: theme.color.activeNav, backgroundColor: theme.color.sidebar }}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
            <textarea
              placeholder="Enter your announcement message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-lg border px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              style={{ borderColor: theme.color.activeNav, backgroundColor: theme.color.sidebar }}
            />
          </div>
          {/* <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Target Audience
            </label>
            <div
              className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-lg border px-4 py-2.5"
              style={{ borderColor: theme.color.activeNav, backgroundColor: theme.color.sidebar }}
            >
              <span className="rounded-full px-3 py-1 text-sm font-medium ">All Mamabot Users</span>
            </div>
          </div> */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                handleCreateAnnouncement()
              }}
            >
              <span className="flex items-center gap-2">
                <Send size={20} />
                {isCreating ? 'Sending...' : 'Send Announcement'}
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
        <PageTitle className="text-black!" as={2}>
          Recent Announcements
        </PageTitle>
        <div className="mt-4 space-y-4">
          {isLoading ? (
            <SkeletonLoading count={2} direction="vertical" />
          ) : (
            data?.data?.map((a: any) => <AnnouncementCard key={a.id} item={a} />)
          )}
        </div>
      </section>
    </>
  )
}

function AnnouncementCard({ item }: { item: any }) {
  return (
    <Card className="relative pr-10">
      {/* <button
        type="button"
        className="absolute right-3 top-3 p-1.5 text-gray-400 hover:text-orange-500"
        aria-label="Delete"
      >
        <Icon name="trash" size={20} />
      </button> */}
      <div className="flex items-center gap-3">
        <Bell className="text-yellow-500" size={22} />
        <h3 className="font-regular text-black! text-lg xl:text-xl">{item.title}</h3>
      </div>
      <p className="mt-1 text-xs text-gray-600">
        Sent on {item.created_at_formatted}
        {'    '}&nbsp; &nbsp;
        <span style={{ color: theme.color.secondary }}>Target: All User</span>
      </p>
      <p className="mt-2 text-sm text-gray-700">{item.message}</p>
    </Card>
  )
}
