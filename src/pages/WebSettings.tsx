import { useEffect, useState } from 'react'
import { PageHeader } from '../components'
import {
  useGetWebSettingDataQuery,
  useUpdateWebSettingMutation,
} from '../redux/features/api/admin/crm'
import LabelInput from './cms/webSettings/LabelInput'
import UploadBox from './cms/webSettings/UploadBox'
import SectionActions from './cms/webSettings/SectionActions'
import { toast } from 'sonner'

type WebSetting = {
  id: number
  site_name?: string
  footer_description?: string
  copyright_text?: string
  footer_text?: string

  insta_link?: string
  fb_link?: string
  tiktok_link?: string
  mail_1?: string
  working_hour?: string
  headquarters_address?: string

  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  google_schema?: string

  logo?: string
  favicon?: string
  meta_image?: string
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="p-5 xl:p-8 bg-white rounded-2xl my-8">
    <h2 className="mb-4 text-lg font-semibold">{title}</h2>
    {children}
  </div>
)

export function WebSettings() {
  const { data } = useGetWebSettingDataQuery()

  const [updateWebSetting, { data: updateData, isLoading }] = useUpdateWebSettingMutation()

  const [form, setForm] = useState<WebSetting | null>(null)

  // file states
  const [files, setFiles] = useState<{
    logo?: File
    favicon?: File
    meta_image?: File
  }>({})

  // preview urls
  const [preview, setPreview] = useState<{
    logo?: string
    favicon?: string
    meta_image?: string
  }>({})

  // sync api → state
  useEffect(() => {
    if (data?.data) {
      setForm(data.data)
      setPreview({
        logo: data.data.logo,
        favicon: data.data.favicon,
        meta_image: data.data.meta_image,
      })
    }
  }, [data])

  if (!data?.data) {
    return (
      <div className="p-5 xl:p-8">
        <PageHeader
          title="Web Settings"
          subtitle="Web Settings"
          description="Manage general site information, contacts, and SEO."
        />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse  border-primary">
            Server issue occurred. Please try again later.
          </div>
        </div>
      </div>
    )
  }

  const handleChange = (key: keyof WebSetting, value: string) => {
    setForm((prev) => ({ ...prev!, [key]: value }))
  }

  const handleFileChange = (key: 'logo' | 'favicon' | 'meta_image', file: File) => {
    setFiles((prev) => ({ ...prev, [key]: file }))
    setPreview((prev) => ({
      ...prev,
      [key]: URL.createObjectURL(file),
    }))
  }

  const handleSave = async () => {
    if (!form) return

    const fd = new FormData()

    const imageFields = ['logo', 'favicon', 'meta_image']

    Object.entries(form).forEach(([key, value]) => {
      // Don't append the existing logo/favicon/meta_image URL strings
      if (imageFields.includes(key)) return

      if (value !== null && value !== undefined) {
        fd.append(key, value as string)
      }
    })

    if (files.logo) fd.append('logo', files.logo)
    if (files.favicon) fd.append('favicon', files.favicon)
    if (files.meta_image) fd.append('meta_image', files.meta_image)

    await updateWebSetting(fd).unwrap()
    toast.success(updateData?.message)
  }

  const handleCancel = () => {
    if (data?.data) {
      setForm(data.data)
      setFiles({})
      setPreview({
        logo: data.data.logo,
        favicon: data.data.favicon,
        meta_image: data.data.meta_image,
      })
    }
  }

  if (!form) return null

  return (
    <>
      <PageHeader
        title="Web Settings"
        subtitle="Web Settings"
        description="Manage general site information, contacts, and SEO."
      />

      {/* GENERAL */}
      <Section title="General Site Information">
        <LabelInput
          label="Site Name"
          value={form.site_name}
          onChange={(v: string) => handleChange('site_name', v)}
        />

        <LabelInput
          label="Footer Description"
          textarea
          value={form.footer_description}
          onChange={(v: string) => handleChange('footer_description', v)}
        />

        <LabelInput
          label="Copyright Text"
          value={form.copyright_text}
          onChange={(v: string) => handleChange('copyright_text', v)}
        />

        <LabelInput
          label="Footer Text"
          value={form.footer_text}
          onChange={(v: string) => handleChange('footer_text', v)}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <UploadBox
            label="Logo"
            preview={preview.logo}
            onSelect={(f) => handleFileChange('logo', f)}
          />
          <UploadBox
            label="Favicon"
            preview={preview.favicon}
            onSelect={(f) => handleFileChange('favicon', f)}
          />
        </div>

        <SectionActions onSave={handleSave} onCancel={handleCancel} loading={isLoading} />
      </Section>

      {/* CONTACT */}
      <Section title="Contact & Social Information">
        <LabelInput
          label="Instagram URL"
          value={form.insta_link}
          onChange={(v: string) => handleChange('insta_link', v)}
        />
        <LabelInput
          label="Facebook URL"
          value={form.fb_link}
          onChange={(v: string) => handleChange('fb_link', v)}
        />
        <LabelInput
          label="TikTok URL"
          value={form.tiktok_link}
          onChange={(v: string) => handleChange('tiktok_link', v)}
        />
        <LabelInput
          label="Primary Email"
          value={form.mail_1}
          onChange={(v: string) => handleChange('mail_1', v)}
        />
        <LabelInput
          label="Working Hours"
          value={form.working_hour}
          onChange={(v: string) => handleChange('working_hour', v)}
        />
        <LabelInput
          label="Headquarter Address"
          textarea
          value={form.headquarters_address}
          onChange={(v: string) => handleChange('headquarters_address', v)}
        />

        <SectionActions onSave={handleSave} onCancel={handleCancel} loading={isLoading} />
      </Section>

      {/* SEO */}
      <Section title="SEO & Metadata">
        <LabelInput
          label="Meta Title"
          value={form.meta_title}
          onChange={(v: string) => handleChange('meta_title', v)}
        />
        <LabelInput
          label="Meta Description"
          textarea
          value={form.meta_description}
          onChange={(v: string) => handleChange('meta_description', v)}
        />
        <LabelInput
          label="Meta Keywords"
          value={form.meta_keywords}
          onChange={(v: string) => handleChange('meta_keywords', v)}
        />

        <UploadBox
          label="Social Share Image (OG Image)"
          preview={preview.meta_image}
          onSelect={(f) => handleFileChange('meta_image', f)}
        />

        <SectionActions onSave={handleSave} onCancel={handleCancel} loading={isLoading} />
      </Section>
    </>
  )
}
