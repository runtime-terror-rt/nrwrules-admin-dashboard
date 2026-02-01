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
    toggleUserStatus: builder.mutation({
      query: (userId: string) => ({
        url: `/users/toggle-block/${userId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const {
  useGetDashboardCardsDataQuery,
  useGetDashboardUsersQuery,
  useToggleUserStatusMutation,
} = userManagement

export default userManagement
