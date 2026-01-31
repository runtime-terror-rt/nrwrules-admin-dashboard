/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const team = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => '/teams',
      providesTags: ['Team'],
    }),
    upsertTeamMember: builder.mutation({
      query: (formData) => ({
        url: '/teams',
        method: 'POST',
        body: formData, // FormData handles 'id' presence for update
      }),
      invalidatesTags: ['Team'],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Team'],
    }),
    toggleStatus: builder.mutation({
      query: ({ id, is_active }) => ({
        url: `/teams/status/${id}`,
        method: 'POST',
        body: { is_active },
      }),
      invalidatesTags: ['Team'],
    }),
  }),
})

export const {
  useGetTeamsQuery,
  useUpsertTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useToggleStatusMutation,
} = team

export default team
