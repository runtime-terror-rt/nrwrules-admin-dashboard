/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const pageSetting = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPages: builder.query({
      query: () => '/pages',
      providesTags: ['PageSetting'],
    }),
    getPageBySlug: builder.query({
      query: (slug) => `/pages/${slug}`,
      providesTags: (slug) => [{ type: 'PageSetting', id: slug }],
    }),
    createUpdatePage: builder.mutation({
      query: (body) => ({
        url: '/pages',
        method: 'POST',
        body, // Sending as JSON based on your API info
      }),
      invalidatesTags: ['PageSetting'],
    }),
    deletePage: builder.mutation({
      query: (id) => ({
        url: `/pages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PageSetting'],
    }),
  }),
})

export const {
  useGetPagesQuery,
  useGetPageBySlugQuery,
  useCreateUpdatePageMutation,
  useDeletePageMutation,
} = pageSetting

export default pageSetting
