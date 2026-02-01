/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const hero = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHero: builder.query({
      query: () => '/hero',
      providesTags: ['Hero'],
    }),
    updateHero: builder.mutation({
      query: (body) => ({
        url: `/hero`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Hero'],
    }),
  }),
})

export const { useGetHeroQuery, useUpdateHeroMutation } = hero

export default hero
