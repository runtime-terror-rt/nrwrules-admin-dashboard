/* eslint-disable @typescript-eslint/no-explicit-any */
import SkeletonLoading from '@/components/SkeletonLoading'
import {
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
  useUpsertTestimonialMutation,
} from '@/redux/features/api/admin/testimonials'
import { Edit, Trash2, Quote } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const TestimonialModal = ({ onClose, initialData }: any) => {
  const [upsertTestimonial, { isLoading }] = useUpsertTestimonialMutation()
  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    description: '',
  })
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        author_name: initialData.author_name,
        author_title: initialData.author_title,
        description: initialData.description,
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    if (initialData?.id) data.append('id', initialData.id)
    data.append('author_name', formData.author_name)
    data.append('author_title', formData.author_title)
    data.append('description', formData.description)
    if (file) data.append('image', file)

    await upsertTestimonial(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-sky-500!">
              {initialData ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <p className="text-gray-400 text-sm">Update what users say about your service.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-orange-200 text-orange-400 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
            >
              {isLoading ? 'Saving...' : 'Update'}
            </button>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Author Name</label>
            <input
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
              placeholder="e.g. Jessica Doe"
              className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Job Title / Role</label>
            <input
              value={formData.author_title}
              onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
              placeholder="e.g. Happy Mother"
              className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Quote</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mamabot revolutionized our patient intake process...."
              className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Author Photo</label>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden">
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    className="object-cover w-full h-full"
                    alt="Preview"
                  />
                ) : (
                  <div className="p-4 bg-gray-100 h-full w-full flex items-center justify-center text-gray-300">
                    <Quote />
                  </div>
                )}
              </div>
              <label className="flex-1 border-2 border-dashed border-sky-100 rounded-xl flex flex-col items-center justify-center cursor-pointer text-sky-400 text-xs">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <span>Click to upload image</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const CmsTestimonials = () => {
  const { data: testimonials, isLoading } = useGetTestimonialsQuery({})
  const [deleteTestimonial] = useDeleteTestimonialMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const handleEdit = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedItem(null)
    setIsModalOpen(true)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-sky-500!">Testimonials</h1>
          <p className="text-gray-500 text-sm">Manage user reviews and testimonials.</p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-rose-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-rose-600 transition"
        >
          <span className="text-xl">+</span> Add Testimonial
        </button>
      </div>

      {/* Grid */}
      {isLoading ? (
        <SkeletonLoading count={3} direction="horizontal" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials?.data?.length === 0 ? (
            <p>No testimonials found.</p>
          ) : (
            testimonials?.data?.map((item: any) => (
              <div
                key={item.id}
                className="w-full min-h-66 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex justify-between gap-3"
              >
                <div className="w-2/7">
                  <div className="w-44 h-44 rounded-3xl overflow-hidden border-2 border-sky-100">
                    <img
                      src={item.image || 'https://via.placeholder.com/150'}
                      alt={item.author_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="w-4/7 flex flex-col justify-between">
                  <p className="text-gray-500 text-sm italic line-clamp-4 ">"{item.description}"</p>

                  <div>
                    <h3 className="text-md font-bold text-gray-800!">{item.author_name}</h3>
                    <p className="text-sky-500 text-xs font-medium">{item.author_title}</p>
                  </div>
                </div>

                <div className="w-1/7 flex gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 w-10 h-10 text-sky-500 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-sky-600 hover:text-white transition text-sm"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(item.id)}
                    className="px-3 py-2 w-10 h-10 text-sky-400 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <TestimonialModal onClose={() => setIsModalOpen(false)} initialData={selectedItem} />
      )}
    </div>
  )
}
