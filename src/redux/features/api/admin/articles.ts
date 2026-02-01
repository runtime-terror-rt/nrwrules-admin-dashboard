/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const articles = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => '/articles',
      providesTags: ['Articles'],
    }),
    getCategories: builder.query({
      query: () => '/article-categories',
      providesTags: ['Articles'],
    }),
    upsertArticle: builder.mutation({
      query: (formData) => ({
        url: '/articles',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Articles'],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/articles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Articles'],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useGetCategoriesQuery,
  useUpsertArticleMutation,
  useDeleteArticleMutation,
} = articles

export default articles
