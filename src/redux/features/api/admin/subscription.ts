/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => '/subscription-plans',
      providesTags: ['Subscription'],
    }),
    updatePlan: builder.mutation({
      query: (body) => ({
        url: `/subscription-plans`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Subscription'],
    }),

    togglePlanStatus: builder.mutation({
      query: (id) => ({
        url: `/subscription-plans/toggle-status/${id}`,
        method: 'POST',
        body: {},
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
  useTogglePlanStatusMutation,
  useGetSubscribersQuery,
  useGetPaymentsQuery,
} = subscription

export default subscription
