import SkeletonLoading from '@/components/SkeletonLoading'
import { useCreateUpdateMissionMutation } from '@/redux/features/api/admin/mission'
import {
  useDeleteTestimonialMutation,
  useGetTestimonialsQuery,
} from '@/redux/features/api/admin/testimonials'
import { Edit, Trash2, Quote } from 'lucide-react'
import { Icon } from '../../components'
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
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-sky-500!">
              {initialData ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Share the positive impact of Mamabot.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Icon name="x" size={20} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Author Details</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                value={formData.author_name}
                onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                placeholder="Author Name"
                className="w-full p-3.5 rounded-2xl bg-gray-50 border border-transparent focus:border-sky-200 focus:bg-white focus:outline-none transition-all"
                required
              />
              <input
                value={formData.author_title}
                onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
                placeholder="Author Title (e.g. New Mother)"
                className="w-full p-3.5 rounded-2xl bg-gray-50 border border-transparent focus:border-sky-200 focus:bg-white focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Testimonial Quote</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter the author's feedback here..."
              className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:border-sky-200 focus:bg-white focus:outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Author Photo</label>
            <div className="flex gap-4 items-center">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-md">
                {previewImage ? (
                  <img src={previewImage} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-300">
                    <Quote size={28} />
                  </div>
                )}
              </div>

              <label className="flex-1 border-dashed border-2 border-sky-100 px-6 py-4 rounded-2xl cursor-pointer text-sky-500 hover:bg-sky-50 transition-colors text-center text-sm font-semibold">
                {file ? file.name : 'Upload New Photo'}
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-50">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-8 py-3.5 border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-8 py-3.5 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95"
            >
              {isLoading ? 'Saving...' : 'Save Testimonial'}
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-sky-500!">Testimonials</h1>
          <p className="text-gray-500 text-sm mt-1">Manage user impact stories and feedback.</p>
        </div>
        <button
          onClick={() => {
            setSelectedItem(null)
            setIsModalOpen(true)
          }}
          className="w-full sm:w-auto bg-rose-500 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95 text-sm font-bold"
        >
          <span className="text-xl">+</span> Add Testimonial
        </button>
      </div>

      {isLoading ? (
        <SkeletonLoading count={3} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data?.data?.map((item: any) => (
            <div key={item.id} className="group bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-all">
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <img src={item.image} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-2xl shadow-sm" />
                <div className="absolute -top-3 -left-3 bg-white p-2 rounded-full shadow-md text-rose-500">
                  <Quote size={20} />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
                <p className="italic text-gray-600 text-sm md:text-base leading-relaxed mb-4">"{item.description}"</p>
                <div>
                  <h3 className="font-bold text-gray-900">{item.author_name}</h3>
                  <p className="text-sky-500 text-xs font-semibold uppercase tracking-wider">{item.author_title}</p>
                </div>
              </div>

              <div className="flex sm:flex-col gap-2 justify-center sm:justify-start pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                <button
                  onClick={() => {
                    setSelectedItem(item)
                    setIsModalOpen(true)
                  }}
                  className="p-2.5 text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
                  title="Edit"
                >
                  <Edit size={20} />
                </button>

                <button 
                  onClick={() => deleteTestimonial(item.id)}
                  className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Delete"
                >
                  <Trash2 size={20} />
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
