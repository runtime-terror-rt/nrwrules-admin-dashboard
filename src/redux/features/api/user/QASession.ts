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
  data: QASessionData
}

export interface QASessionsListResponse {
  success: boolean
  message: string
  data: QASessionData[]
}

export const liveQASessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new session
    createSession: builder.mutation<QASessionResponse, QASessionPayload>({
      query: (body) => ({
        url: '/qa-sessions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['LiveQASession'],
    }),

    // Retrieve all active sessions
    getSessions: builder.query<QASessionsListResponse, void>({
      query: () => ({
        url: '/qa-sessions',
        method: 'GET',
      }),
      providesTags: ['LiveQASession'],
    }),
  }),
  overrideExisting: false,
})

// Export hooks
export const { useCreateSessionMutation, useGetSessionsQuery } = liveQASessionApi
