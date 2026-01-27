import { Button, Card, Icon, PageHeader, PageTitle } from '../components'
import { CheckIcon, XIcon } from '../components/icons'
import {
  reportedStats,
  pendingReports,
  recentlyReviewed,
  type PendingReport,
  type ReviewedItem,
} from '../data'

/** Reported Content — Figma node 3498-12355. Summary cards, Pending Review, Recently Reviewed. */
export function ReportedContent() {
  return (
    <>
      <PageHeader
        title="Reported Content"
        subtitle="Reported Content"
        description="Review and moderate reported posts."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {reportedStats.map((s) => (
          <Card key={s.label}>
            <p className="mb-1 text-sm text-[var(--color-text-secondary)]">{s.label}</p>
            <p
              className={`text-2xl font-bold ${
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

      <PageTitle as={2}>Pending Review</PageTitle>
      <div className="mb-8 space-y-4">
        {pendingReports.map((item) => (
          <PendingReportCard key={`${item.reporter}-${item.posted}`} item={item} />
        ))}
      </div>

      <PageTitle as={2}>Recently Reviewed</PageTitle>
      <div className="space-y-4">
        {recentlyReviewed.map((item) => (
          <ReviewedCard key={`${item.reporter}-${item.posted}`} item={item} />
        ))}
      </div>
    </>
  )
}

function PendingReportCard({ item }: { item: PendingReport }) {
  const tagClass =
    item.tagVariant === 'spam'
      ? 'bg-pink-100 text-pink-700'
      : item.tagVariant === 'misinformation'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-orange-100 text-orange-700'
  const parts = item.highlight
    ? item.content.split(item.highlight)
    : [item.content]
  return (
    <Card>
      <div className="flex items-start gap-2">
        <Icon name="warning" size={20} className="shrink-0 text-[var(--color-warning)]" />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-800">{item.reporter}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tagClass}`}>
              {item.tag}
            </span>
          </div>
          <p className="mb-2 text-xs text-gray-500">
            Posted: {item.posted} · {item.reportCount} reports
          </p>
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            {item.highlight
              ? parts.map((p, i) => (
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
            <Button variant="success" size="sm" type="button">
              <span className="flex items-center gap-1.5">
                <CheckIcon size={14} />
                Approve Post
              </span>
            </Button>
            <Button variant="danger" size="sm" type="button">
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

function ReviewedCard({ item }: { item: ReviewedItem }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-gray-800">{item.reporter}</p>
          <p className="mt-1 text-xs text-gray-500">Posted: {item.posted}</p>
          <p className="mt-2 text-sm text-gray-700">{item.content}</p>
        </div>
        <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          {item.status}
        </span>
      </div>
    </Card>
  )
}

