import { baseApi } from '../baseApi'

export interface CommunityUser {
  id: number
  first_name: string
  last_name: string
  phone?: string
  email?: string
  profile?: any
}

export interface CommunityComment {
  id: number
  post_id: number
  user_id: number
  content: string
  created_at: string
  updated_at: string
  user: CommunityUser
}

export interface CommunityShare {
  id: number
  post_id: number
  user_id: number
  shared_at: string
  user: {
    id: number
    first_name: string
    last_name: string
  }
}

export interface CommunityGroup {
  id: number
  name: string
  slug: string
  description: string
  stage: string
  member_count: number
  is_active: number
  created_at: string
  updated_at: string
}

export interface CommunityPost {
  id: number
  user_id: number
  group_id: number
  title: string
  slug: string
  content: string
  role_label: string
  week: number
  image_urls: string[]
  moderation_report_status: 'pending' | 'approved' | 'rejected'
  reported_count: number
  posted_at: string
  created_at: string
  updated_at: string

  likes_count: number
  comments_count: number
  shares_count: number

  is_liked: boolean
  is_joined: boolean

  user: CommunityUser
  comments: CommunityComment[]
  shares: CommunityShare[]
  group: CommunityGroup
}

export interface CommunityPostResponse {
  success: boolean
  data: CommunityPost[]
}

export const communityPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityPostsPage: builder.query<CommunityPostResponse, void>({
      query: () => ({
        url: '/community/posts',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    deleteCommunityPost: builder.mutation<{ success: boolean; message: string }, number>({
      query: (postId) => ({
        url: `/community/posts/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Community'],
    }),
  }),
})

export const { useGetCommunityPostsPageQuery, useDeleteCommunityPostMutation } = communityPostApi
