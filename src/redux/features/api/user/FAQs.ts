import { baseApi } from '../baseApi'

export interface SaveFaqPayload {
  id?: number // optional, only for update
  question: string
  answer: string
  order: number
  is_active: boolean
}

export interface SaveFaqResponse {
  success: boolean
  message: string
  data?: any
}

export interface DeleteFaqResponse {
  message: string
}

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveFaq: builder.mutation<SaveFaqResponse, SaveFaqPayload>({
      query: (body) => ({
        url: '/faqs/save',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FAQs'],
    }),

    deleteFaq: builder.mutation<DeleteFaqResponse, number>({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQs'],
    }),
  }),
  overrideExisting: false,
})

// Hooks
export const { useSaveFaqMutation, useDeleteFaqMutation } = faqApi
