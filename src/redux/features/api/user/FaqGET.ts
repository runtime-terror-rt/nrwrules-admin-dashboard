import { baseApi } from "../baseApi"


export interface Faq {
  id: number
  question: string
  answer: string
  order: number
  is_active: number
  created_at: string
  updated_at: string
}

export interface GetFaqsResponse {
  success: boolean
  data: Faq[]
}

export const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query<GetFaqsResponse, void>({
      query: () => ({
        url: '/faqs',
        method: 'GET',
      }),
      providesTags: ['FAQs'],
    }),
  }),
  overrideExisting: false,
})

export const { useGetFaqsQuery } = faqApi
