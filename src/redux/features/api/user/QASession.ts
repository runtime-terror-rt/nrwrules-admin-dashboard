import { baseApi } from '../baseApi'

export interface QASessionPayload {
  doctor_id: number
  topic: string
  start_time: string
  end_time: string
  meeting_link: string
}

export interface DoctorData {
  id: number
  name: string
  specialty: string
  image: string
  is_active: number
  created_at: string
  updated_at: string
}

export interface QASessionData {
  id: number
  doctor_id: number
  topic: string
  start_time: string
  end_time: string
  meeting_link: string
  created_at: string
  updated_at: string
  doctor?: DoctorData
}

export interface QASessionResponse {
  success: boolean
  message: string
  data?: QASessionData
}

export interface QASessionsListResponse {
  success: boolean
  message: string
  data: QASessionData[]
}

export const liveQASessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE
    createSession: builder.mutation<QASessionResponse, QASessionPayload>({
      query: (body) => ({
        url: '/qa-sessions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LiveQASession'],
    }),

    // GET LIST
    getSessions: builder.query<QASessionsListResponse, void>({
      query: () => ({
        url: '/qa-sessions',
        method: 'GET',
      }),
      providesTags: ['LiveQASession'],
    }),

    // DELETE (POST /qa-sessions/{id})
    deleteSession: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/qa-sessions/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['LiveQASession'],
    }),
  }),
  overrideExisting: false,
})

// Export hooks
export const { useCreateSessionMutation, useGetSessionsQuery, useDeleteSessionMutation } =
  liveQASessionApi
