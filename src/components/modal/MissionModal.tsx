/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { theme } from '../../constants'
import { useCreateUpdateMissionMutation } from '../../redux/features/api/admin/mission'

const MissionModal = ({
  children,
  initialData,
}: {
  children: React.ReactNode
  initialData?: any
}) => {
  const [createUpdateMission, { isLoading }] = useCreateUpdateMissionMutation()
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    sortOrder: 0,
  })

  const [iconImg, setIcon] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // Sync form state when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        description: initialData.description || '',
        sortOrder: initialData.sort_order || 0,
      })
      setPreview(initialData.icon || null)
    }
  }, [initialData, open])

  const handleIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const icon = e.target.files?.[0]
    if (icon) {
      setIcon(icon)
      setPreview(URL.createObjectURL(icon))
    }
  }

  const handleSubmit = async () => {
    const formData = new FormData()
    if (initialData?.id) formData.append('id', initialData.id)
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('sort_order', form.sortOrder.toString())
    if (iconImg) {
      formData.append('icon_url', iconImg)
    }

    try {
      await createUpdateMission(formData).unwrap()
      setOpen(false)
      // Reset form if it was a create operation
      if (!initialData) {
        setForm({ title: '', description: '', sortOrder: 0 })
        setIcon(null)
        setPreview(null)
      }
    } catch (error) {
      console.error('Failed to save mission:', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-sky-500!">
            {initialData ? 'Edit Mission' : 'Create Mission'}
          </DialogTitle>
          <DialogDescription>
            <div className="mt-4">
              <div className="grid gap-6 sm:grid-cols-2 text-left">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mission Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      placeholder="e.g., New Features Available"
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Enter content description..."
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={form.sortOrder}
                      onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">Icon / Image</label>
                  <div
                    className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer overflow-hidden"
                    onClick={() => document.getElementById('icon-upload')?.click()}
                  >
                    {preview ? (
                      <img src={preview} alt="Preview" className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-[var(--color-primary)] text-sm">
                        Click or Drag image here
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleIcon}
                      className="hidden"
                      id="icon-upload"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  className="rounded-lg px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: theme.color.primary }}
                >
                  {isLoading ? 'Saving...' : 'Save Mission'}
                </button>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="rounded-lg border border-orange-400 bg-white px-6 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50"
                  >
                    Cancel
                  </button>
                </DialogClose>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default MissionModal
