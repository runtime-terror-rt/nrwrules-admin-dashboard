import SkeletonLoading from '@/components/SkeletonLoading'
import { useCreateUpdateMissionMutation } from '@/redux/features/api/admin/mission'
import {
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
} from '@/redux/features/api/admin/testimonials'
import { Edit, Trash2, Quote } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const TestimonialModal = ({ onClose, initialData }: any) => {
  const [createUpdateTestimonial, { isLoading }] = useCreateUpdateMissionMutation()

  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    description: '',
  })

  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        author_name: initialData.author_name || '',
        author_title: initialData.author_title || '',
        description: initialData.description || '',
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()

    if (initialData?.id) {
      data.append('id', initialData.id)
    }

    data.append('author_name', formData.author_name)
    data.append('author_title', formData.author_title)
    data.append('description', formData.description)

    if (file) {
      data.append('image', file)
    }

    await createUpdateTestimonial(data).unwrap()
    onClose()
  }

  const previewImage = file ? URL.createObjectURL(file) : initialData?.image || null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-sky-500!">
              {initialData ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <p className="text-gray-400 text-sm">Update what users say about your service.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={formData.author_name}
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            placeholder="Author Name"
            className="w-full p-3 rounded-xl bg-gray-50"
          />

          <input
            value={formData.author_title}
            onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
            placeholder="Author Title"
            className="w-full p-3 rounded-xl bg-gray-50"
          />

          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Testimonial quote"
            className="w-full p-3 rounded-xl bg-gray-50"
          />

          {/* Image upload */}
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
              {previewImage ? (
                <img src={previewImage} className="w-full h-full object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-300">
                  <Quote />
                </div>
              )}
            </div>

            <label className="border-dashed border-2 border-sky-200 px-4 py-3 rounded-xl cursor-pointer text-sky-500">
              Upload Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-rose-500 text-white rounded-lg">
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const CmsTestimonials = () => {
  const { data, isLoading } = useGetTestimonialsQuery({})
  const [deleteTestimonial] = useDeleteTestimonialMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold text-sky-500!">Testimonials</h1>
        <button
          onClick={() => {
            setSelectedItem(null)
            setIsModalOpen(true)
          }}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Testimonial
        </button>
      </div>

      {isLoading ? (
        <SkeletonLoading count={3} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.map((item: any) => (
            <div key={item.id} className="bg-white p-6 rounded-xl flex gap-4">
              <img src={item.image} className="w-32 h-32 object-cover rounded-xl" />

              <div className="flex-1">
                <p className="italic text-gray-500">"{item.description}"</p>
                <h3 className="font-bold">{item.author_name}</h3>
                <p className="text-sky-500 text-sm">{item.author_title}</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSelectedItem(item)
                    setIsModalOpen(true)
                  }}
                >
                  <Edit size={16} />
                </button>

                <button onClick={() => deleteTestimonial(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <TestimonialModal initialData={selectedItem} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}
