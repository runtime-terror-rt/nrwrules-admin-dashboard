import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Icon, Modal, PageHeader, SearchInput } from '../components'
import { theme } from '../constants'
import { communityFilterTabs } from '../data'
import { useGetCommunityStateCardsDataQuery } from '../redux/features/api/admin/communityMonitoring'
import SkeletonLoading from '@/components/SkeletonLoading'
import Swal from 'sweetalert2'
import {
  useDeleteCommunityPostMutation,
  useGetCommunityPostsPageQuery,
} from '@/redux/features/api/user/CommunityPost'
import { CloudCog } from 'lucide-react'

type FilterTabId = 'all' | 'active' | 'inactive' | 'reported'
type UICommunityPost = {
  id: string
  author: string
  content: string
  timestamp: string
  title: string
  reported: boolean
  likes: number
  comments: number
  likedBy: string[]

  commentEntries: {
    id: string
    author: string
    content: string
    timestamp: string
  }[]
}

/** Community Monitoring — same pattern as User Management: search, filters, add, details modal, delete. */
export function Community() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterTabId>('all')
  const [posts, setPosts] = useState<UICommunityPost[]>([])
  const [selectedPost, setSelectedPost] = useState<UICommunityPost | null>(null)

  /** ------------------ STATS ------------------ */
  const { data: communityStatsData, isLoading: communityStatsLoading } =
    useGetCommunityStateCardsDataQuery()



  const [deleteCommunityPost, { isLoading: isDeleting }] = useDeleteCommunityPostMutation()

  /** ------------------ POSTS API ------------------ */
  const { data: communityPostsData, isLoading: communityPostsLoading } =
    useGetCommunityPostsPageQuery()

  useEffect(() => {
    if (!communityPostsData?.data) return

    const mapped: UICommunityPost[] = communityPostsData.data.map((post) => ({
      id: String(post.id), //  convert number → string

      author: `${post.user.first_name} ${post.user.last_name}`,
      content: post.content,
      title: post.title,
      timestamp: new Date(post.created_at).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),

      reported: post.reported_count > 0,
      likes: post.likes_count,
      comments: post.comments_count,
      likedBy: [],

      commentEntries: post.comments.map((c) => ({
        id: String(c.id),
        author: `${c.user.first_name} ${c.user.last_name}`,
        content: c.content,
        timestamp: new Date(c.created_at).toLocaleString(),
      })),
    }))

    setPosts(mapped)
  }, [communityPostsData])

  /** ------------------ FILTER ------------------ */
  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase()
    return posts.filter((p) => {
      if (q && !p.author.toLowerCase().includes(q) && !p.content.toLowerCase().includes(q))
        return false

      switch (activeFilter) {
        case 'active':
          return !p.reported
        case 'inactive':
        case 'reported':
          return p.reported
        default:
          return true
      }
    })
  }, [posts, search, activeFilter])

  /** ------------------ DELETE POST (UI ONLY) ------------------ */
  const handleDeletePost = async (post: UICommunityPost) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This post will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e11d48',
    })

    if (!result.isConfirmed) return

    try {
      const res = await deleteCommunityPost(Number(post.id)).unwrap()

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: res.message || 'Post deleted successfully.',
        timer: 1800,
        showConfirmButton: false,
      })

      setSelectedPost(null) // modal close
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: err?.data?.message || 'Something went wrong while deleting the post.',
      })
    }
  }

  /** ------------------ RENDER ------------------ */
  return (
    <>
      <PageHeader
        title="Community Monitoring"
        subtitle="Community Monitoring"
        description="Monitor posts, comments, and community activity."
      />

      {communityStatsLoading ? (
        <div className="mb-8">
          <SkeletonLoading count={4} direction="horizontal" height="h-32" />
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 border-[#FEE3ED]">
            <p className="text-gray-500 text-sm mb-2 font-medium">Total Posts</p>
            <p className="text-4xl font-bold text-[#d1217b]">
              {communityStatsData?.data?.total_post?.count ??
                communityStatsData?.data?.total_post ??
                communityStatsData?.data?.total_posts?.count ??
                communityStatsData?.data?.total_posts ??
                posts.length}
            </p>
          </Card>
          <Card className="p-6 border-[#FEE3ED]">
            <p className="text-gray-500 text-sm mb-2 font-medium">Total Comments</p>
            <p className="text-4xl font-bold text-[#d1217b]">
              {communityStatsData?.data?.total_comment?.count ??
                communityStatsData?.data?.total_comment ??
                communityStatsData?.data?.total_comments?.count ??
                communityStatsData?.data?.total_comments ??
                posts.reduce((acc, p) => acc + (p.comments || 0), 0)}
            </p>
          </Card>
          <Card className="p-6 border-[#FEE3ED]">
            <p className="text-gray-500 text-sm mb-2 font-medium">Total Likes</p>
            <p className="text-4xl font-bold text-[#d1217b]">
              {communityStatsData?.data?.total_like?.count ??
                communityStatsData?.data?.total_like ??
                communityStatsData?.data?.total_likes?.count ??
                communityStatsData?.data?.total_likes ??
                posts.reduce((acc, p) => acc + (p.likes || 0), 0)}
            </p>
          </Card>
          <Card className="p-6 border-[#FEE3ED]">
            <p className="text-gray-500 text-sm mb-2 font-medium">Reported Posts</p>
            <p className="text-4xl font-bold text-orange-400">
              {communityStatsData?.data?.reported_post?.count ??
                communityStatsData?.data?.reported_post ??
                communityStatsData?.data?.reported_posts?.count ??
                communityStatsData?.data?.reported_posts ??
                posts.filter((p) => p.reported).length}
            </p>
          </Card>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <SearchInput
          placeholder="Search by author or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="min-w-55 max-w-xl flex-1"
        />

        <div className="flex gap-2">
          {(communityFilterTabs as { id: FilterTabId; label: string }[]).map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveFilter(t.id)}
              className={`rounded-lg px-4 py-2 text-sm ${
                activeFilter === t.id ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {communityPostsLoading ? (
          <SkeletonLoading count={4} height="h-30" direction="vertical" />
        ) : (
          filteredPosts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={post}
              onCardClick={() => setSelectedPost(post)}
              onDelete={(e) => {
                e.stopPropagation()
                handleDeletePost(post)
              }}
            />
          ))
        )}
      </div>

      {/* Post details modal — who liked, what are comments, delete comment */}
      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        title={selectedPost ? `${selectedPost.author} — Post details` : ''}
      >
        {selectedPost && (
          <div className="space-y-4">
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[auto_1fr]">
              <dt className="font-medium text-text-secondary">Author</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedPost.author}</dd>
              <dt className="font-medium text-text-secondary">Title</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedPost.title}</dd>
              <dt className="font-medium text-text-secondary">Time</dt>
              <dd style={{ color: theme.color.textPrimary }}>{selectedPost.timestamp}</dd>
              <dt className="font-medium text-text-secondary">Reported</dt>
              <dd>{selectedPost.reported ? 'Yes' : 'No'}</dd>
              <dt className="font-medium text-text-secondary">Content</dt>
              <dd className="sm:col-span-1" style={{ color: theme.color.textPrimary }}>
                {selectedPost.content}
              </dd>
            </dl>

            <section className="border-t border-gray-100 pt-4">
              <h3 className="mb-2 text-sm font-semibold" style={{ color: theme.color.primary }}>
                Likes ({selectedPost.likes})
              </h3>
              <p className="text-sm text-text-primary">
                {selectedPost.likedBy?.length ? selectedPost.likedBy.join(', ') : 'No likes yet'}
              </p>
            </section>

            <section className="border-t border-gray-100 pt-4">
              <h3 className="mb-2 text-sm font-semibold" style={{ color: theme.color.primary }}>
                Comments ({selectedPost.commentEntries?.length ?? selectedPost.comments ?? 0})
              </h3>
              <ul className="space-y-3">
                {(selectedPost.commentEntries ?? []).map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-text-secondary">
                        {c.author} · {c.timestamp}
                      </p>
                      <p className="mt-0.5 text-sm" style={{ color: theme.color.textPrimary }}>
                        {c.content}
                      </p>
                    </div>
                  </li>
                ))}
                {(!selectedPost.commentEntries || selectedPost.commentEntries.length === 0) && (
                  <li className="text-sm text-text-secondary">No comments yet.</li>
                )}
              </ul>
            </section>

            <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              <Button
                variant="danger"
                size="sm"
                type="button"
                className="bg-rose-600 hover:bg-rose-700 text-white border-none"
                onClick={() => handleDeletePost(selectedPost)}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete post'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

interface CommunityPostCardProps {
  post: UICommunityPost
  onCardClick: () => void
  onDelete: (e: React.MouseEvent) => void
}

function CommunityPostCard({ post, onCardClick, onDelete }: CommunityPostCardProps) {
  return (
    <Card
      className="cursor-pointer flex-col gap-2 transition-opacity hover:opacity-95"
      onClick={onCardClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm xl:text-base font-semibold text-gray-900">{post.author}</p>
          <p className="flex items-center gap-1.5 text-xs xl:text-sm text-gray-500">
            <Icon name="clock" size={14} className="shrink-0" />
            {post.timestamp}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {post.reported && (
            <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
              Reported
            </span>
          )}
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-red-500"
            aria-label="Delete"
            onClick={onDelete}
          >
            <Icon name="trash" size={20} />
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm xl:text-base text-gray-700 line-clamp-2">{post.content}</p>
      <div className="flex items-center gap-4 text-xs xl:text-sm text-sky-400">
        <span className="flex items-center gap-1">
          <Icon name="message" size={14} className="shrink-0" />
          {post.commentEntries?.length ?? post.comments} Comments
        </span>
        <span className="flex items-center gap-1">
          <Icon name="heart" size={14} className="shrink-0" />
          {post.likes} Likes
        </span>
      </div>
    </Card>
  )
}
