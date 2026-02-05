/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const relaxationAudioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // 🔹 Get all relaxation audios
    getRelaxationAudios: builder.query<any, void>({
      query: () => '/relaxation-audios',
      providesTags: ['RelaxationAudio'],
    }),

    // 🔹 Upload relaxation audio
    uploadRelaxationAudio: builder.mutation({
      query: (formData) => ({
        url: '/relaxation-audio/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['RelaxationAudio'],
    }),
  }),
})

export const {
  useGetRelaxationAudiosQuery,
  useUploadRelaxationAudioMutation,
} = relaxationAudioApi

export default relaxationAudioApi
