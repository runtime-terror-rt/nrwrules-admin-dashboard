/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const mission = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMissions: builder.query({
      query: () => '/missions',
      providesTags: ['Mission'],
    }),
    createUpdateMission: builder.mutation({
      query: (formData) => ({
        url: '/missions',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Mission'],
    }),
    deleteMission: builder.mutation({
      query: (id) => ({
        url: `/missions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Mission'],
    }),
  }),
})

export const { useGetMissionsQuery, useCreateUpdateMissionMutation, useDeleteMissionMutation } =
  mission

export default mission
