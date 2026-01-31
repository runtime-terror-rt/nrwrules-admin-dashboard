/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const testimonials = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonials'],
    }),
    upsertTestimonial: builder.mutation({
      query: (formData) => ({
        url: '/testimonials',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Testimonials'],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonials'],
    }),
  }),
})

export const {
  useGetTestimonialsQuery,
  useUpsertTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonials

export default testimonials
