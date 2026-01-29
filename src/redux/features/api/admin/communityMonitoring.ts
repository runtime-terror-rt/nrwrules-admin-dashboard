/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const communityMonitoring = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityStateCardsData: builder.query<any, void>({
      query: () => ({
        url: '/community-stats',
        method: 'GET',
      }),
      providesTags: ['Community', 'Admin'],
    }),
    getCommunityPosts: builder.query({
      query: () => ({
        url: '/community/posts/1',
        method: 'GET',
      }),
      providesTags: ['Community', 'Admin'],
    }),
    getReportedPosts: builder.query({
      query: () => ({
        url: '/reported-content-stats',
        method: 'GET',
      }),
      providesTags: ['Community', 'Admin'],
    }),
    approveOrRemoveReportedPost: builder.mutation({
      query: ({ id, action }) => ({
        url: `/community/posts/moderate/${id}`,
        method: 'POST',
        body: {
          action,
        },
      }),
      invalidatesTags: ['Community', 'Admin'],
    }),
  }),
})

export const {
  useGetCommunityStateCardsDataQuery,
  useGetCommunityPostsQuery,
  useGetReportedPostsQuery,
  useApproveOrRemoveReportedPostMutation,
} = communityMonitoring

export default communityMonitoring
