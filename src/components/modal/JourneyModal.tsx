/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { theme } from '../../constants'
import { useCreateUpdateJourneyMutation } from '../../redux/features/api/admin/journey'
import { toast } from 'sonner'

const JourneyModal = ({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData?: any
}) => {
  const [createUpdate, { isLoading }] = useCreateUpdateJourneyMutation()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    count: '',
    subtitle_1: '',
    subtitle_2: '',
    locale: 'en',
  })

  const [images, setImages] = useState<{ img1: File | null; img2: File | null }>({
    img1: null,
    img2: null,
  })
  const [previews, setPreviews] = useState({ p1: '', p2: '' })

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        count: initialData.count || '',
        subtitle_1: initialData.subtitle_1 || '',
        subtitle_2: initialData.subtitle_2 || '',
        locale: initialData.locale || 'en',
      })
      setPreviews({ p1: initialData.image_url_1 || '', p2: initialData.image_url_2 || '' })
    } else {
      setForm({
        title: '',
        description: '',
        count: '',
        subtitle_1: '',
        subtitle_2: '',
        locale: 'en',
      })
      setPreviews({ p1: '', p2: '' })
      setImages({ img1: null, img2: null })
    }
  }, [initialData, open])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, key: 'img1' | 'img2') => {
    const file = e.target.files?.[0]
    if (file) {
      setImages((prev) => ({ ...prev, [key]: file }))
      setPreviews((prev) => ({
        ...prev,
        [key === 'img1' ? 'p1' : 'p2']: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    if (initialData?.id) formData.append('id', initialData.id)
    Object.entries(form).forEach(([key, val]) => formData.append(key, val))
    if (images.img1) formData.append('image_url_1', images.img1)
    if (images.img2) formData.append('image_url_2', images.img2)

    await createUpdate(formData).unwrap()
    setOpen(false)
    toast.success('Journey saved successfully')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-sky-500!">Our Journey Milestone</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <label htmlFor="title">Journey Title</label>
            <input
              id="title"
              placeholder="Journey Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded-lg mt-1"
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border p-2 rounded-lg mt-1"
            />
            <label htmlFor="count">Milestone Count</label>
            <input
              id="count"
              placeholder="Count (e.g. 300)"
              type="number"
              value={form.count}
              onChange={(e) => setForm({ ...form, count: e.target.value })}
              className="w-full border p-2 rounded-lg mt-1"
            />
            <label htmlFor="subtitle_1">Subtitle One</label>
            <input
              id="subtitle_1"
              placeholder="Subtitle One"
              value={form.subtitle_1}
              onChange={(e) => setForm({ ...form, subtitle_1: e.target.value })}
              className="w-full border p-2 rounded-lg mt-1"
            />
            <label htmlFor="subtitle_2">Subtitle Two</label>
            <input
              id="subtitle_2"
              placeholder="Subtitle Two"
              value={form.subtitle_2}
              onChange={(e) => setForm({ ...form, subtitle_2: e.target.value })}
              className="w-full border p-2 rounded-lg mt-1"
            />
          </div>
          <div className="space-y-4">
            <div
              className="border-2 border-dashed h-32 flex items-center justify-center rounded-lg relative overflow-hidden cursor-pointer"
              onClick={() => document.getElementById('j1')?.click()}
            >
              {previews.p1 ? (
                <img src={previews.p1} className="w-full h-full object-cover" />
              ) : (
                <span>Upload Image 1</span>
              )}
              <input type="file" id="j1" hidden onChange={(e) => handleFile(e, 'img1')} />
            </div>
            <div
              className="border-2 border-dashed h-32 flex items-center justify-center rounded-lg relative overflow-hidden cursor-pointer"
              onClick={() => document.getElementById('j2')?.click()}
            >
              {previews.p2 ? (
                <img src={previews.p2} className="w-full h-full object-cover" />
              ) : (
                <span>Upload Image 2</span>
              )}
              <input type="file" id="j2" hidden onChange={(e) => handleFile(e, 'img2')} />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 py-2 text-white rounded-lg"
            style={{ backgroundColor: theme.color.primary }}
          >
            {isLoading ? 'Saving...' : 'Save Journey'}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-6 py-2 border border-orange-400 text-orange-600 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default JourneyModal
