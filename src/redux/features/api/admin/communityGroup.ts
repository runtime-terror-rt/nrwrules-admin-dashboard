/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const communityGroupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommunityGroups: builder.query({
      query: () => ({
        url: '/community-groups',
        method: 'GET',
      }),
      providesTags: ['CommunityGroup'],
    }),
    deleteCommunityGroup: builder.mutation({
      query: (id) => ({
        url: `/community-groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CommunityGroup'],
    }),
    toggleGroupStatus: builder.mutation({
      query: (id) => ({
        url: `/active-deactive-group/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['CommunityGroup'],
    }),
  }),
})

export const {
  useGetCommunityGroupsQuery,
  useDeleteCommunityGroupMutation,
  useToggleGroupStatusMutation,
} = communityGroupApi

export default communityGroupApi
