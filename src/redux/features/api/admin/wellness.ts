/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const wellness = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWellnessActivities: builder.query({
      query: () => '/wellness-activities',
      providesTags: ['Wellness'],
    }),
    getWellnessActivityById: builder.query({
      query: (id) => `/wellness-activities/${id}`,
      providesTags: ['Wellness'],
    }),
    saveWellnessActivity: builder.mutation({
      query: (formData) => ({
        url: '/wellness-activities-save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Wellness'],
    }),
    deleteWellnessActivity: builder.mutation({
      query: (id) => ({
        url: `/wellness-activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wellness'],
    }),
  }),
})

export const {
  useGetWellnessActivitiesQuery,
  useGetWellnessActivityByIdQuery,
  useSaveWellnessActivityMutation,
  useDeleteWellnessActivityMutation,
} = wellness

export default wellness
