/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const analyticsToolsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalyticsTools: builder.query({
      query: () => '/analytics',
      providesTags: ['AnalyticsTools'],
    }),
    updateAnalyticsTool: builder.mutation({
      query: ({ id, tracking_id, enabled }) => ({
        url: `/analytics/${id}`,
        method: 'PUT',
        body: { tracking_id, enabled },
      }),
      invalidatesTags: ['AnalyticsTools'],
    }),
  }),
})

export const { useGetAnalyticsToolsQuery, useUpdateAnalyticsToolMutation } = analyticsToolsApi

export default analyticsToolsApi
