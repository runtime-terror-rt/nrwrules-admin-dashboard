import { baseApi } from '@/redux/features/api/baseApi'

export interface Page {
  id: number
  slug: string
  title: string
  content: string
  meta_title?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  meta_image?: string | null
  is_active: number
  is_indexable: number
  created_at: string
  updated_at: string
}

export interface EditPageRequest {
  title: string
  content: string
  meta_title?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  meta_image?: string | null
  is_active?: boolean | number
  is_indexable?: boolean | number
}

export interface EditPageResponse {
  success: boolean
  message: string
  data: Page
}

export const pageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    editPage: builder.mutation<EditPageResponse, { pageId: number; body: EditPageRequest }>({
      query: ({ pageId, body }) => ({
        url: `/pages/${pageId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['PageSetting'], 
    }),
  }),
  overrideExisting: false,
})

export const { useEditPageMutation } = pageApi
