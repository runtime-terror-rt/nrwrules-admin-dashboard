/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const journey = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJourneys: builder.query({
      query: () => '/our-journey',
      providesTags: ['Journey'],
    }),
    createUpdateJourney: builder.mutation({
      query: (formData) => ({
        url: '/our-journey',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Journey'],
    }),
    deleteJourney: builder.mutation({
      query: (id) => ({
        url: `/our-journey/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Journey'],
    }),
  }),
})

export const { useGetJourneysQuery, useCreateUpdateJourneyMutation, useDeleteJourneyMutation } =
  journey

export default journey
