/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { Button, Card, Icon, PageHeader, PageTitle } from '../components'
import { CheckIcon, XIcon } from '../components/icons'
import { format } from 'date-fns'
import { reportedStats } from '../data'
import {
  useApproveOrRemoveReportedPostMutation,
  useGetReportedPostsQuery,
} from '../redux/features/api/admin/communityMonitoring'
import SkeletonLoading from '@/components/SkeletonLoading'

/** Reported Content — Figma node 3498-12355. Summary cards, Pending Review, Recently Reviewed. */
export function ReportedContent() {
  const { data: reportedPostsData, isLoading: reportedPostsLoading } = useGetReportedPostsQuery({})
  const displayStats = useMemo(() => {
    if (!reportedPostsData?.data) return reportedStats
    return [
      { ...reportedStats[0], value: reportedPostsData?.stats?.pending_review ?? 0 },
      { ...reportedStats[1], value: reportedPostsData?.stats?.approved ?? 0 },
      { ...reportedStats[2], value: reportedPostsData?.stats?.removed ?? 0 },
    ]
  }, [reportedPostsData])

  const pendingReports = useMemo(() => {
    if (!reportedPostsData?.data) return []
    return reportedPostsData?.data.filter(
      (item: any) => item.moderation_report_status === 'pending'
    )
  }, [reportedPostsData])

  const recentlyReviewed = useMemo(() => {
    if (!reportedPostsData?.data) return []
    return reportedPostsData?.data.filter(
      (item: any) => item.moderation_report_status !== 'pending'
    )
  }, [reportedPostsData])

  return (
    <>
      <PageHeader
        title="Reported Content"
        subtitle="Reported Content"
        description="Review and moderate reported posts."
      />

      {reportedPostsLoading ? (
        <SkeletonLoading count={3} height="h-30" />
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {displayStats.map((s) => (
            <Card key={s.label} className="h-30 flex flex-col justify-center gap-2">
              <p className="mb-1 text-sm xl:text-base text-[var(--color-text-secondary)]">
                {s.label}
              </p>
              <p
                className={`text-4xl xl:text-5xl font-bold ${
                  s.color === 'pink'
                    ? 'text-[var(--color-primary)]'
                    : s.color === 'green'
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-warning)]'
                }`}
              >
                {s.value}
              </p>
            </Card>
          ))}
        </div>
      )}

      <PageTitle as={2}>Pending Review</PageTitle>
      <div className="mb-8 space-y-4">
        {pendingReports.length > 0 ? (
          pendingReports.map((item: any) => <PendingReportCard key={item.id} item={item} />)
        ) : (
          <div className="text-center text-gray-500 py-20 border rounded-lg border-gray-100!">
            No pending reports
          </div>
        )}
      </div>

      <PageTitle as={2}>Recently Reviewed</PageTitle>
      <div className="space-y-4">
        {recentlyReviewed.length > 0 ? (
          recentlyReviewed.map((item: any) => (
            <ReviewedCard key={`${item.reporter}-${item.posted}`} item={item} />
          ))
        ) : (
          <div className="text-center text-gray-500 py-20 border rounded-lg border-gray-100!">
            No recently reviewed posts
          </div>
        )}
      </div>
    </>
  )
}

function PendingReportCard({ item }: { item: any }) {
  const tagClass =
    item.tagVariant === 'spam'
      ? 'bg-pink-100 text-pink-700'
      : item.tagVariant === 'misinformation'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-orange-100 text-orange-700'
  const parts = item.highlight ? item.content.split(item.highlight) : [item.content]

  const [approveOrRemoveReportedPost] = useApproveOrRemoveReportedPostMutation()
  return (
    <Card>
      <div className="flex items-start gap-2">
        <Icon name="warning" size={20} className="shrink-0 text-[var(--color-warning)]" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-sm xl:text-base font-medium text-gray-800">
              {item.reporter ? item.reporter : item.title}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagClass}`}>
              {item.tag ? item.tag : ''}
            </span>
          </div>
          <p className="mb-2 text-xs xl:text-sm text-gray-500">
            <p className="text-xs text-gray-400">
              Posted: {format(new Date(item.posted_at), "MMMM d, yyyy 'at' h:mm a")}
            </p>
            <p className="mt-1 text-xs xl:text-sm text-yellow-600">{item.reported_count} reports</p>
          </p>
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm xl:text-base text-gray-700">
            {item.highlight
              ? parts.map((p: string, i: number) => (
                  <span key={i}>
                    {p}
                    {i < parts.length - 1 && (
                      <span className="font-medium text-red-600">{item.highlight}</span>
                    )}
                  </span>
                ))
              : item.content}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="success"
              size="sm"
              type="button"
              onClick={() => approveOrRemoveReportedPost({ id: item.id, action: 'approve' })}
            >
              <span className="flex items-center gap-1.5">
                <CheckIcon size={14} />
                Approve Post
              </span>
            </Button>
            <Button
              variant="danger"
              size="sm"
              type="button"
              onClick={() => approveOrRemoveReportedPost({ id: item.id, action: 'remove' })}
            >
              <span className="flex items-center gap-1.5">
                <XIcon size={14} />
                Remove Post
              </span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ReviewedCard({ item }: { item: any }) {
  return (
    <Card className="border border-green-400">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm xl:text-base font-medium text-gray-800">
            {item.user.first_name + ' ' + item.user.last_name}
          </p>
          <p className=" text-xs xl:text-sm text-gray-500">
            Posted: {format(new Date(item.posted_at), "MMMM d, yyyy 'at' h:mm a")}
          </p>
          <p className="mt-3 text-sm xl:text-base text-gray-700">{item.content}</p>
        </div>
        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          {item.moderation_report_status}
        </span>
      </div>
    </Card>
  )
}
