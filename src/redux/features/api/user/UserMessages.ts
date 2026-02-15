import { baseApi } from '../baseApi'

export interface ContactMessage {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  message: string
  attachment: string | null
  agreed_to_privacy: boolean
  submitted_at: string
}

export interface ContactMessagesResponse {
  success: boolean
  data: ContactMessage[]
}

export const userMessagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserMessages: builder.query<ContactMessagesResponse, void>({
      query: () => ({
        url: '/contact/messages',
        method: 'GET',
      }),
      providesTags: ['UserMessages'],
    }),

    deleteUserMessage: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/contact/messages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserMessages'],
    }),
  }),
})

export const { useGetUserMessagesQuery, useDeleteUserMessageMutation } = userMessagesApi
