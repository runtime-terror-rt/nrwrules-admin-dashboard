/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const communityMonitoring = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityStateCardsData: builder.query<any, void>({
      query: () => ({
        url: '/community-stats',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    getCommunityPosts: builder.query({
      query: () => ({
        url: '/community/posts/1',
        method: 'GET',
      }),
      providesTags: ['Community'],
    }),
    getReportedPosts: builder.query({
      query: () => ({
        url: '/reported-content-stats',
        method: 'GET',
      }),
      providesTags: ['ReportedPost'],
    }),
    approveOrRemoveReportedPost: builder.mutation({
      query: ({ id, action }) => ({
        url: `/community/posts/moderate/${id}`,
        method: 'POST',
        body: {
          action,
        },
      }),
      invalidatesTags: ['ReportedPost'],
    }),
    getAnalyticsData: builder.query({
      query: () => `/analytics/dashboard`,
      providesTags: ['Admin'],
    }),
    getAnnouncements: builder.query({
      query: () => `/global-notification-list`,
      providesTags: ['Notification'],
    }),
    createAnnouncement: builder.mutation({
      query: ({ title, message }) => ({
        url: `/global-notification`,
        method: 'POST',
        body: {
          title,
          message,
        },
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
})

export const {
  useGetCommunityStateCardsDataQuery,
  useGetCommunityPostsQuery,
  useGetReportedPostsQuery,
  useApproveOrRemoveReportedPostMutation,
  useGetAnalyticsDataQuery,
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
} = communityMonitoring

export default communityMonitoring
