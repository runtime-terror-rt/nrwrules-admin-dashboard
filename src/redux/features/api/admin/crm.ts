/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '../baseApi'

const crm = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebSettingData: builder.query<any, void>({
      query: () => `/web-settings`,
      providesTags: ['Admin'],
    }),
    updateWebSetting: builder.mutation({
      query: (body) => ({
        url: '/web-settings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const { useGetWebSettingDataQuery, useUpdateWebSettingMutation } = crm

export default crm
