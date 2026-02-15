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
        url: '/relaxation-audios/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['RelaxationAudio'],
    }),

    // 🔹 Delete relaxation audio
    deleteRelaxationAudio: builder.mutation({
      query: (id) => ({
        url: `/relaxation-audios/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RelaxationAudio'],
    }),
  }),
})

export const {
  useGetRelaxationAudiosQuery,
  useUploadRelaxationAudioMutation,
  useDeleteRelaxationAudioMutation,
} = relaxationAudioApi

export default relaxationAudioApi
