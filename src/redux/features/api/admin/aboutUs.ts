/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const aboutUs = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAboutUs: builder.query({
      query: () => '/about-us',
      providesTags: ['AboutUs'],
    }),
    createUpdateAboutUs: builder.mutation({
      query: (formData) => ({
        url: '/about-us/save',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['AboutUs'],
    }),
    deleteAboutUs: builder.mutation({
      query: (id) => ({
        url: `/about-us/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AboutUs'],
    }),
  }),
})

export const { useGetAboutUsQuery, useCreateUpdateAboutUsMutation, useDeleteAboutUsMutation } =
  aboutUs

export default aboutUs
