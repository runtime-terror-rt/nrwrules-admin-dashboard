/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import SkeletonLoading from '@/components/SkeletonLoading'
import { Button, Card, PageHeader } from '../../components'
import {
  useGetAboutUsQuery,
  useCreateUpdateAboutUsMutation,
} from '@/redux/features/api/admin/aboutUs'
import { toast } from 'sonner' // Assuming you use sonner or similar for notifications

export function CmsAboutUs() {
  const { data, isLoading } = useGetAboutUsQuery(undefined)
  const [createUpdateAboutUs, { isLoading: isUpdating }] = useCreateUpdateAboutUsMutation()

  // Local state for form management
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    content: '',
    locale: 'en',
  })

  const [images, setImages] = useState<{ img1: File | null; img2: File | null }>({
    img1: null,
    img2: null,
  })

  const [previews, setPreviews] = useState({
    p1: '',
    p2: '',
  })

  // Populate form when data is fetched
  useEffect(() => {
    if (data?.data) {
      setForm({
        title: data.data.title || '',
        subtitle: data.data.subtitle || '',
        content: data.data.content || '',
        locale: data.data.locale || 'en',
      })
      setPreviews({
        p1: data.data.image_url_1 || '',
        p2: data.data.image_url_2 || '',
      })
    }
  }, [data])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, key: 'img1' | 'img2') => {
    const file = e.target.files?.[0]
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }))
      setPreviews((prev) => ({
        ...prev,
        [key === 'img1' ? 'p1' : 'p2']: URL.createObjectURL(file),
      }))
    }
  }

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('subtitle', form.subtitle)
    formData.append('content', form.content)
    formData.append('locale', form.locale)

    if (images.img1) formData.append('main_img', images.img1)
    if (images.img2) formData.append('inset_img', images.img2)

    try {
      await createUpdateAboutUs(formData).unwrap()
      toast.success('About Us updated successfully!')
    } catch (error) {
      toast.error('Failed to update content')
      console.error(error)
    }
  }

  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="CMS · About Us"
        description="Manage the About Us section content and images."
        action={
          <Button variant="primary" size="md" onClick={handleSave} disabled={isUpdating}>
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </Button>
        }
      />

      {isLoading ? (
        <SkeletonLoading count={1} />
      ) : (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 500+ Clients"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-sky-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Subtitle</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="Main heading..."
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Content</label>
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                {/* Toolbar */}
                <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 p-2">
                  <ToolbarButton label="B" onClick={() => {}} />
                  <ToolbarButton label="I" onClick={() => {}} />
                  <ToolbarButton label="U" onClick={() => {}} />
                  <span className="mx-1 border-l border-gray-200" />
                  <ToolbarButton label="≡" onClick={() => {}} />
                  <ToolbarButton label="≡" onClick={() => {}} />
                  <ToolbarButton label="•" onClick={() => {}} />
                  <ToolbarButton label="🔗" onClick={() => {}} />
                </div>
                {/* Editor Area */}
                <textarea
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Detail the significance of this milestone..."
                  className="w-full px-3 py-2 text-sm border-none focus:ring-0 focus:outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Note: Use HTML tags for advanced styling if needed.
              </p>
            </div>
            {/* {data?.data?.main_img && (
              <div className="my-4">
                <p>Current main image</p>
                <img src={data.data.main_img} alt="Main Image" className="max-w-full rounded-lg" />
              </div>
            )} */}

            <div>
              <label className="mb-4 block text-sm font-medium text-gray-700">Section Images</label>
              <div className="flex flex-wrap gap-8">
                <ImageUploadBox
                  id="image1"
                  label="Image 1"
                  preview={previews.p1}
                  currentImage={data?.data?.main_img}
                  onChange={(e: any) => handleImageChange(e, 'img1')}
                />
                <ImageUploadBox
                  id="image2"
                  label="Image 2"
                  preview={previews.p2}
                  currentImage={data?.data?.sub_img}
                  onChange={(e: any) => handleImageChange(e, 'img2')}
                />
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}

// Helper Components for Cleaner UI
const ToolbarButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded px-2 py-1 text-xs font-bold text-gray-500 hover:bg-gray-200 transition-colors"
  >
    {label}
  </button>
)

const ImageUploadBox = ({ id, label, preview, currentImage, onChange }: any) => (
  <div className="space-y-2">
    <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
    <div
      className="relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all overflow-hidden"
      onClick={() => document.getElementById(id)?.click()}
    >
      {preview ? (
        <img src={preview} alt="preview" className=" h-full w-full object-cover" />
      ) : (
        <div className="text-center px-2 relative">
          {currentImage && (
            <img
              src={currentImage}
              alt="current"
              className="absolute h-full w-full object-cover z-0"
            />
          )}
          <span className="text-xl text-[var(--color-primary)] z-10">+</span>
          <p className="text-[10px] text-gray-400 z-10">Click to Upload</p>
        </div>
      )}
      <input type="file" className="hidden" id={id} accept="image/*" onChange={onChange} />
    </div>
  </div>
)
