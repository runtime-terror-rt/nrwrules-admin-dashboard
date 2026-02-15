// import { useMemo, useState } from 'react'
// import { Button, Card, Icon, Modal, PageHeader, SearchInput } from '../components'
// import { theme } from '../constants'
// import { communityFilterTabs, communityPosts, communityStats, type CommunityPost } from '../data'
// import { useGetCommunityStateCardsDataQuery } from '../redux/features/api/admin/communityMonitoring'
// import SkeletonLoading from '@/components/SkeletonLoading'
// import { useGetCommunityPostsQuery } from '../redux/features/api/user/community'
// import Swal from 'sweetalert2'
// import { useGetCommunityPostsPageQuery } from '@/redux/features/api/user/CommunityPost'

// type FilterTabId = 'all' | 'active' | 'inactive' | 'reported'
// type UICommunityPost = CommunityPost & {
//   author: string
//   timestamp: string
//   reported: boolean
//   likes: number
//   comments: number
//   likedBy: string[]
//   commentEntries: {
//     id: string
//     author: string
//     content: string
//     timestamp: string
//   }[]
// }

// /** Community Monitoring — same pattern as User Management: search, filters, add, details modal, delete. */
// export function Community() {
//   const [search, setSearch] = useState('')
//   const [activeFilter, setActiveFilter] = useState<FilterTabId>('all')
//   // const [posts, setPosts] = useState<CommunityPost[]>(communityPosts)
//   const [posts, setPosts] = useState<UICommunityPost[]>([])
// const { data: communityPostsGetData, isLoading: communityPostsGetLoading } =
//   useGetCommunityPostsPageQuery()

//   const [selectedPost, setSelectedPost] = useState<CommunityPost | null>(null)
//   const [showAddModal, setShowAddModal] = useState(false)

//   const { data: communityStatsData, isLoading: communityStatsLoading } =
//     useGetCommunityStateCardsDataQuery()
//   const displayStats = useMemo(() => {
//     if (!communityStatsData?.data) return communityStats
//     return [
//       { ...communityStats[0], value: communityStatsData.data.total_posts ?? 0 },
//       { ...communityStats[1], value: communityStatsData.data.total_comments ?? 0 },
//       { ...communityStats[2], value: communityStatsData.data.total_likes ?? 0 },
//       {
//         ...communityStats[3],
//         value: `${communityStatsData.data.reported_posts ?? 0}`,
//       },
//     ]
//   }, [communityStatsData])

//   const { data: communityPostsData, isLoading: communityPostsLoading } = useGetCommunityPostsQuery(
//     {}
//   )
//   console.log(communityPostsData)

//   const filteredPosts = useMemo(() => {
//     const q = search.trim().toLowerCase()
//     return posts.filter((p) => {
//       if (q && !p.author.toLowerCase().includes(q) && !p.content.toLowerCase().includes(q))
//         return false
//       switch (activeFilter) {
//         case 'active':
//           return !p.reported
//         case 'inactive':
//           return !!p.reported
//         case 'reported':
//           return !!p.reported
//         default:
//           return true
//       }
//     })
//   }, [posts, search, activeFilter])

//   const handleDeletePost = (post: CommunityPost) => {
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton:
//           'bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl mx-2',
//         cancelButton:
//           'bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mx-2',
//       },
//       buttonsStyling: false,
//     })
//     swalWithBootstrapButtons
//       .fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonText: 'Yes, delete it!',
//         cancelButtonText: 'No, cancel!',
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           setPosts((prev) => prev.filter((p) => p.id !== post.id))
//           setSelectedPost(null)
//           swalWithBootstrapButtons.fire({
//             title: 'Deleted!',
//             text: 'Your post has been deleted.',
//             icon: 'success',
//           })
//         } else if (
//           /* Read more about handling dismissals below */
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire({
//             title: 'Cancelled',
//             text: 'Your post is safe :)',
//             icon: 'error',
//           })
//         }
//       })
//   }

//   const handleToggleReported = (post: CommunityPost) => {
//     setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, reported: !p.reported } : p)))
//     setSelectedPost((p) => (p && p.id === post.id ? { ...p, reported: !p.reported } : p))
//   }

//   const handleDeleteComment = (postId: string, commentId: string) => {
//     setPosts((prev) =>
//       prev.map((p) => {
//         if (p.id !== postId) return p
//         const next = (p.commentEntries ?? []).filter((c) => c.id !== commentId)
//         return { ...p, commentEntries: next, comments: next.length }
//       })
//     )
//     setSelectedPost((p) => {
//       if (!p || p.id !== postId) return p
//       const next = (p.commentEntries ?? []).filter((c) => c.id !== commentId)
//       return { ...p, commentEntries: next, comments: next.length }
//     })
//   }

//   const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const form = e.currentTarget
//     const author = (form.elements.namedItem('author') as HTMLInputElement)?.value
//     const content = (form.elements.namedItem('content') as HTMLInputElement)?.value
//     if (!author || !content) return
//     setPosts((prev) => [
//       ...prev,
//       {
//         id: String(Date.now()),
//         author,
//         content,
//         timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
//         comments: 0,
//         likes: 0,
//         likedBy: [],
//         commentEntries: [],
//       },
//     ])
//     setShowAddModal(false)
//     form.reset()
//   }

//   return (
//     <>
//       <PageHeader
//         title="Community Monitoring"
//         subtitle="Community Monitoring"
//         description="Monitor posts, comments, and community activity."
//       />

//       {communityStatsLoading ? (
//         <SkeletonLoading count={4} height="h-8" />
//       ) : (
//         <div className="mb-6 flex flex-wrap items-center gap-3">
//           <SearchInput
//             placeholder="Search by author or content..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="min-w-[220px] max-w-xl flex-1"
//           />
//           <div className="flex flex-wrap items-center gap-2">
//             <Icon name="filter" size={20} className="text-[var(--color-text-secondary)]" />
//             {(communityFilterTabs as { id: FilterTabId; label: string }[]).map((t) => (
//               <button
//                 key={t.id}
//                 type="button"
//                 onClick={() => setActiveFilter(t.id)}
//                 className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
//                   activeFilter === t.id
//                     ? 'bg-pink-600 text-white'
//                     : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                 }`}
//               >
//                 {t.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {communityStatsLoading ? (
//         <SkeletonLoading count={4} height="h-30" />
//       ) : (
//         <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {displayStats.map((s) => (
//             <Card key={s.label} className="h-30 flex flex-col justify-center gap-2">
//               <p className="mb-1 text-sm xl:text-base text-gray-600">{s.label}</p>
//               <p className="text-3xl xl:text-5xl font-bold text-[var(--color-primary)]">
//                 {s.value}
//               </p>
//             </Card>
//           ))}
//         </div>
//       )}

//       <div className="space-y-4">
//         {communityPostsLoading ? (
//           <SkeletonLoading count={4} height="h-30" direction="vertical" />
//         ) : (
//           filteredPosts.map((post) => (
//             <CommunityPostCard
//               key={post.id}
//               post={post}
//               onCardClick={() => setSelectedPost(post)}
//               onDelete={(e) => {
//                 e.stopPropagation()
//                 handleDeletePost(post)
//               }}
//             />
//           ))
//         )}
//       </div>

//       {/* Post details modal — who liked, what are comments, delete comment */}
//       <Modal
//         open={!!selectedPost}
//         onClose={() => setSelectedPost(null)}
//         title={selectedPost ? `${selectedPost.author} — Post details` : ''}
//       >
//         {selectedPost && (
//           <div className="space-y-4">
//             <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-[auto_1fr]">
//               <dt className="font-medium text-[var(--color-text-secondary)]">Author</dt>
//               <dd style={{ color: theme.color.textPrimary }}>{selectedPost.author}</dd>
//               <dt className="font-medium text-[var(--color-text-secondary)]">Time</dt>
//               <dd style={{ color: theme.color.textPrimary }}>{selectedPost.timestamp}</dd>
//               <dt className="font-medium text-[var(--color-text-secondary)]">Reported</dt>
//               <dd>{selectedPost.reported ? 'Yes' : 'No'}</dd>
//               <dt className="font-medium text-[var(--color-text-secondary)]">Content</dt>
//               <dd className="sm:col-span-1" style={{ color: theme.color.textPrimary }}>
//                 {selectedPost.content}
//               </dd>
//             </dl>

//             <section className="border-t border-gray-100 pt-4">
//               <h3 className="mb-2 text-sm font-semibold" style={{ color: theme.color.primary }}>
//                 Likes ({selectedPost.likes})
//               </h3>
//               <p className="text-sm text-[var(--color-text-primary)]">
//                 {selectedPost.likedBy?.length ? selectedPost.likedBy.join(', ') : 'No likes yet'}
//               </p>
//             </section>

//             <section className="border-t border-gray-100 pt-4">
//               <h3 className="mb-2 text-sm font-semibold" style={{ color: theme.color.primary }}>
//                 Comments ({selectedPost.commentEntries?.length ?? selectedPost.comments ?? 0})
//               </h3>
//               <ul className="space-y-3">
//                 {(selectedPost.commentEntries ?? []).map((c) => (
//                   <li
//                     key={c.id}
//                     className="flex flex-wrap items-start justify-between gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-3"
//                   >
//                     <div className="min-w-0 flex-1">
//                       <p className="text-xs font-medium text-[var(--color-text-secondary)]">
//                         {c.author} · {c.timestamp}
//                       </p>
//                       <p className="mt-0.5 text-sm" style={{ color: theme.color.textPrimary }}>
//                         {c.content}
//                       </p>
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => handleDeleteComment(selectedPost.id, c.id)}
//                       className="shrink-0 rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
//                       aria-label="Delete comment"
//                     >
//                       <Icon name="trash" size={18} />
//                     </button>
//                   </li>
//                 ))}
//                 {(!selectedPost.commentEntries || selectedPost.commentEntries.length === 0) && (
//                   <li className="text-sm text-[var(--color-text-secondary)]">No comments yet.</li>
//                 )}
//               </ul>
//             </section>

//             <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
//               <Button
//                 variant="primary"
//                 size="sm"
//                 type="button"
//                 className="bg-sky-600 hover:bg-sky-700 text-white border-none"
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 type="button"
//                 className="bg-gray-600 hover:bg-gray-700 text-white border-none"
//                 onClick={() => handleToggleReported(selectedPost)}
//               >
//                 {selectedPost.reported ? 'Dismiss report' : 'Mark as reported'}
//               </Button>
//               <Button
//                 variant="danger"
//                 size="sm"
//                 type="button"
//                 className="bg-rose-600 hover:bg-rose-700 text-white border-none"
//                 onClick={() => handleDeletePost(selectedPost)}
//               >
//                 Delete post
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Add post modal */}
//       <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add post">
//         <form onSubmit={handleAddPost} className="space-y-4">
//           <div>
//             <label
//               className="mb-1.5 block text-sm font-medium"
//               style={{ color: theme.color.textPrimary }}
//             >
//               Author
//             </label>
//             <input
//               name="author"
//               required
//               className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
//               placeholder="Author name"
//             />
//           </div>
//           <div>
//             <label
//               className="mb-1.5 block text-sm font-medium"
//               style={{ color: theme.color.textPrimary }}
//             >
//               Content
//             </label>
//             <textarea
//               name="content"
//               required
//               rows={4}
//               className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
//               placeholder="Post content..."
//             />
//           </div>
//           <div className="flex gap-2 pt-2">
//             <Button
//               type="submit"
//               variant="primary"
//               className="bg-pink-600 hover:bg-pink-700 text-white border-none"
//             >
//               Add post
//             </Button>
//             <Button
//               type="button"
//               variant="secondary"
//               onClick={() => setShowAddModal(false)}
//               className="bg-gray-500 hover:bg-gray-600 text-white border-none"
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       </Modal>
//     </>
//   )
// }

// interface CommunityPostCardProps {
//   post: CommunityPost
//   onCardClick: () => void
//   onDelete: (e: React.MouseEvent) => void
// }

// function CommunityPostCard({ post, onCardClick, onDelete }: CommunityPostCardProps) {
//   return (
//     <Card
//       className="cursor-pointer flex-col gap-2 transition-opacity hover:opacity-95"
//       onClick={onCardClick}
//     >
//       <div className="flex items-start justify-between gap-4">
//         <div className="min-w-0 flex-1">
//           <p className="text-sm xl:text-base font-semibold text-gray-900">{post.author}</p>
//           <p className="flex items-center gap-1.5 text-xs xl:text-sm text-gray-500">
//             <Icon name="clock" size={14} className="shrink-0" />
//             {post.timestamp}
//           </p>
//         </div>
//         <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
//           {post.reported && (
//             <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
//               Reported
//             </span>
//           )}
//           <button
//             type="button"
//             className="p-1.5 text-gray-400 hover:text-red-500"
//             aria-label="Delete"
//             onClick={onDelete}
//           >
//             <Icon name="trash" size={20} />
//           </button>
//         </div>
//       </div>
//       <p className="mt-2 text-sm xl:text-base text-gray-700 line-clamp-2">{post.content}</p>
//       <div className="flex items-center gap-4 text-xs xl:text-sm text-sky-400">
//         <span className="flex items-center gap-1">
//           <Icon name="message" size={14} className="shrink-0" />
//           {post.commentEntries?.length ?? post.comments} Comments
//         </span>
//         <span className="flex items-center gap-1">
//           <Icon name="heart" size={14} className="shrink-0" />
//           {post.likes} Likes
//         </span>
//       </div>
//     </Card>
//   )
// }

import { useEffect, useMemo, useState } from 'react'
import { Button, Card, Icon, Modal, PageHeader, SearchInput } from '../components'
import { theme } from '../constants'
import { communityFilterTabs, communityStats } from '../data'
import { useGetCommunityStateCardsDataQuery } from '../redux/features/api/admin/communityMonitoring'
import SkeletonLoading from '@/components/SkeletonLoading'
import Swal from 'sweetalert2'
import {
  useDeleteCommunityPostMutation,
  useGetCommunityPostsPageQuery,
} from '@/redux/features/api/user/CommunityPost'

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
  const [showAddModal, setShowAddModal] = useState(false)

  /** ------------------ STATS ------------------ */
  const { data: communityStatsData, isLoading: communityStatsLoading } =
    useGetCommunityStateCardsDataQuery()
  const [deleteCommunityPost, { isLoading: isDeleting }] = useDeleteCommunityPostMutation()

  const displayStats = useMemo(() => {
    if (!communityStatsData?.data) return communityStats
    return [
      { ...communityStats[0], value: communityStatsData.data.total_posts ?? 0 },
      { ...communityStats[1], value: communityStatsData.data.total_comments ?? 0 },
      { ...communityStats[2], value: communityStatsData.data.total_likes ?? 0 },
      { ...communityStats[3], value: communityStatsData.data.reported_posts ?? 0 },
    ]
  }, [communityStatsData])

  /** ------------------ POSTS API ------------------ */
  const { data: communityPostsData, isLoading: communityPostsLoading } =
    useGetCommunityPostsPageQuery()

  useEffect(() => {
    if (!communityPostsData?.data) return

    // const mapped: UICommunityPost[] = communityPostsData.data.map((post) => ({
    //   ...post,

    //   author: `${post.user.first_name} ${post.user.last_name}`,
    //   timestamp: new Date(post.created_at).toLocaleString('en-US', {
    //     dateStyle: 'medium',
    //     timeStyle: 'short',
    //   }),

    //   reported: post.reported_count > 0,
    //   likes: post.likes_count,
    //   comments: post.comments_count,
    //   likedBy: [],

    //   commentEntries: post.comments.map((c) => ({
    //     id: String(c.id),
    //     author: `${c.user.first_name} ${c.user.last_name}`,
    //     content: c.content,
    //     timestamp: new Date(c.created_at).toLocaleString(),
    //   })),
    // }))
    const mapped: UICommunityPost[] = communityPostsData.data.map((post) => ({
      id: String(post.id), // ✅ convert number → string

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

  // const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const form = e.currentTarget
  //   const author = (form.elements.namedItem('author') as HTMLInputElement)?.value
  //   const content = (form.elements.namedItem('content') as HTMLInputElement)?.value
  //   if (!author || !content) return
  //   setPosts((prev) => [
  //     ...prev,
  //     {
  //       id: String(Date.now()),
  //       author,
  //       content,
  //       timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
  //       comments: 0,
  //       likes: 0,
  //       likedBy: [],
  //       commentEntries: [],
  //     },
  //   ])
  //   setShowAddModal(false)
  //   form.reset()
  // }

  const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const author = (form.elements.namedItem('author') as HTMLInputElement)?.value
    const content = (form.elements.namedItem('content') as HTMLInputElement)?.value
    if (!author || !content) return

    const newPost: UICommunityPost = {
      id: String(Date.now()),
      author,
      content,
      title: 'New post title',
      timestamp: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),

      reported: false,
      likes: 0,
      comments: 0,
      likedBy: [],
      commentEntries: [],
    }

    setPosts((prev) => [...prev, newPost])
    setShowAddModal(false)
    form.reset()
  }

  const handleDeleteComment = (postId: string, commentId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p
        const next = (p.commentEntries ?? []).filter((c) => c.id !== commentId)
        return { ...p, commentEntries: next, comments: next.length }
      })
    )
    setSelectedPost((p) => {
      if (!p || p.id !== postId) return p
      const next = (p.commentEntries ?? []).filter((c) => c.id !== commentId)
      return { ...p, commentEntries: next, comments: next.length }
    })
  }
  /** ------------------ TOGGLE REPORTED (UI ONLY) ------------------ */
  const handleToggleReported = (post: UICommunityPost) => {
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, reported: !p.reported } : p)))
    setSelectedPost((p) => (p ? { ...p, reported: !p.reported } : p))
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
        <SkeletonLoading count={4} height="h-8" />
      ) : (
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
      )}

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
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(selectedPost.id, c.id)}
                      className="shrink-0 rounded p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete comment"
                    >
                      <Icon name="trash" size={18} />
                    </button>
                  </li>
                ))}
                {(!selectedPost.commentEntries || selectedPost.commentEntries.length === 0) && (
                  <li className="text-sm text-text-secondary">No comments yet.</li>
                )}
              </ul>
            </section>

            <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
              <Button
                variant="primary"
                size="sm"
                type="button"
                className="bg-sky-600 hover:bg-sky-700 text-white border-none"
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white border-none"
                onClick={() => handleToggleReported(selectedPost)}
              >
                {selectedPost.reported ? 'Dismiss report' : 'Mark as reported'}
              </Button>
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

      {/* Add post modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add post">
        <form onSubmit={handleAddPost} className="space-y-4">
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: theme.color.textPrimary }}
            >
              Author
            </label>
            <input
              name="author"
              required
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              placeholder="Author name"
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: theme.color.textPrimary }}
            >
              Content
            </label>
            <textarea
              name="content"
              required
              rows={4}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              placeholder="Post content..."
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="submit"
              variant="primary"
              className="bg-pink-600 hover:bg-pink-700 text-white border-none"
            >
              Add post
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddModal(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white border-none"
            >
              Cancel
            </Button>
          </div>
        </form>
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
