/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => '/subscription-plans',
      providesTags: ['Subscription'],
    }),
    updatePlan: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/subscription-plans/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Subscription'],
    }),

    // Subscriber Management
    getSubscribers: builder.query({
      query: () => '/subscribers',
      providesTags: ['Subscription'],
    }),

    // Payment/Transaction Ledger
    getPayments: builder.query({
      query: () => '/payments',
      providesTags: ['Subscription'],
    }),
  }),
})

export const {
  useGetPlansQuery,
  useUpdatePlanMutation,
  useGetSubscribersQuery,
  useGetPaymentsQuery,
} = subscription

export default subscription
