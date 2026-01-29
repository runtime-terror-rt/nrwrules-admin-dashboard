import { baseApi } from '../baseApi'

const userManagement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCardsData: builder.query({
      query: () => ({
        url: '/user-stats',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),
    getDashboardUsers: builder.query({
      query: () => ({
        url: '/profiles',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),
  }),
})

export const { useGetDashboardCardsDataQuery, useGetDashboardUsersQuery } = userManagement

export default userManagement
