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
  }),
})

export const { useGetCommunityStateCardsDataQuery, useGetCommunityPostsQuery } = communityMonitoring

export default communityMonitoring
