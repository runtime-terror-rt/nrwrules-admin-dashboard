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
    // service api
    getServiceData: builder.query<any, void>({
      query: () => '/services',
      providesTags: ['Service'],
    }),

    createOrUpdateService: builder.mutation({
      query: (formData: FormData) => ({
        url: '/services',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Service'],
    }),

    deleteService: builder.mutation({
      query: (id: number) => ({
        url: `/services/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'],
    }),

    toggleServiceStatus: builder.mutation({
      query: (id: number) => ({
        url: `/services/toggle-status/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Service'],
    }),
  }),
})

export const {
  useGetWebSettingDataQuery,
  useUpdateWebSettingMutation,
  useGetServiceDataQuery,
  useCreateOrUpdateServiceMutation,
  useDeleteServiceMutation,
  useToggleServiceStatusMutation,
} = crm

export default crm
