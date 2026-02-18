import { baseApi } from "./baseApi"


export interface WebSettingsResponse {
  success: boolean
  data: {
    id: number
    site_name: string
    logo: string | null
    favicon: string | null
    footer_description: string
    copyright_text: string
    footer_text: string
    insta_link: string
    fb_link: string
    tiktok_link: string
    mail_1: string
    mail_2: string
    working_hour: string
    headquarter_address: string
    meta_title?: string | null
    meta_description?: string | null
    meta_keywords?: string | null
    meta_image?: string | null
    google_schema?: string | null
    created_at: string
    updated_at: string
  }
}

export const footerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWebSettings: builder.query<WebSettingsResponse, void>({
      query: () => ({
        url: '/web-settings',
        method: 'GET',
      }),
      providesTags: ['WebsiteData'],
    }),
  }),
})

export const { useGetWebSettingsQuery } = footerApi
