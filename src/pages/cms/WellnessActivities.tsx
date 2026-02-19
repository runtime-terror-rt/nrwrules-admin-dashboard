/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Image as ImageIcon, Video, Clock } from 'lucide-react'
import SkeletonLoading from '@/components/SkeletonLoading'
import {
  useDeleteWellnessActivityMutation,
  useGetWellnessActivitiesQuery,
  useSaveWellnessActivityMutation,
} from '@/redux/features/api/admin/wellness'
import { Button, PageHeader } from '@/components'
import { toast } from 'sonner'
import Swal from 'sweetalert2'

const ActivityModal = ({ initialData, onCancel }: { initialData: any; onCancel: () => void }) => {
  const [saveActivity, { isLoading }] = useSaveWellnessActivityMutation()


  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    phase_type: 'pregnancy',
    trimester: '1',
    duration: '',
    video_url: '',
    status: '1',
  })

  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        short_description: initialData.short_description || '',
        phase_type: initialData.phase_type || 'pregnancy',
        trimester: initialData.trimester?.toString() || '1',
        duration: initialData.duration?.toString() || '',
        video_url: initialData.video_url || '',
        status: initialData.status?.toString() || '1',
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    if (initialData?.id) data.append('id', initialData.id)

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })

    if (image) data.append('image', image)

    try {
      await saveActivity(data).unwrap()
      toast.success(initialData ? 'Activity updated successfully' : 'Activity saved successfully')
      onCancel()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to save activity')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl animate-in fade-in zoom-in duration-300 text-black">
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-sky-500! mb-1">
                {initialData ? 'Edit Activity' : 'Add New Activity'}
              </h2>
              <p className="text-gray-400 text-sm">Fill in the details for the wellness activity.</p>
            </div>
            <button type="button" onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Plus className="rotate-45 text-gray-400" size={24} />
            </button>
          </div>

          <div className="space-y-5">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Title</label>
                  <input
                    required
                    className="w-full p-4 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none font-semibold text-gray-800"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Activity Title (e.g., Prenatal Yoga)"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Duration (mins)</label>
                  <input
                    required
                    type="number"
                    className="w-full p-4 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none text-gray-800"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="Duration"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Short Description</label>
                <textarea
                  required
                  rows={3}
                  className="w-full p-4 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none text-gray-600 resize-none"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  placeholder="Brief description..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1 text-gray-700">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Phase Type</label>
                  <select
                    required
                    className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none appearance-none cursor-pointer"
                    value={formData.phase_type}
                    onChange={(e) => setFormData({ ...formData, phase_type: e.target.value })}
                  >
                    <option value="pregnancy">Pregnancy</option>
                    <option value="postpartum">Postpartum</option>
                  </select>
                </div>
                <div className="space-y-1 text-gray-700">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Trimester</label>
                  <select
                    required
                    className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none appearance-none cursor-pointer"
                    value={formData.trimester}
                    onChange={(e) => setFormData({ ...formData, trimester: e.target.value })}
                  >
                    <option value="1">Trimester 1</option>
                    <option value="2">Trimester 2</option>
                    <option value="3">Trimester 3</option>
                  </select>
                </div>
                <div className="space-y-1 text-gray-700">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Status</label>
                  <select
                    required
                    className="w-full p-3.5 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none appearance-none cursor-pointer"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Video URL (YouTube)</label>
                <div className="relative">
                  <Video className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    className="w-full p-4 pl-12 border border-transparent bg-gray-50 focus:bg-white focus:border-sky-200 rounded-2xl transition-all outline-none text-gray-800"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Activity Image</label>
                <label className="w-full h-48 border-2 border-dashed border-gray-100 bg-gray-50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition relative overflow-hidden group">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  {image ? (
                    <img src={URL.createObjectURL(image)} className="object-cover w-full h-full" />
                  ) : initialData?.image ? (
                    <img src={initialData.image} className="object-cover w-full h-full" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <ImageIcon className="text-gray-300 group-hover:text-sky-400 transition-colors" size={40} />
                      <span className="text-xs text-gray-400 font-bold uppercase tracking-tight">Select Image</span>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-50">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-rose-500 text-white p-4 rounded-2xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95 disabled:opacity-50"
            >
              {initialData
                ? isLoading ? 'Updating...' : 'Update Activity'
                : isLoading ? 'Saving...' : 'Save Activity'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-10 py-4 border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const WellnessActivities = () => {
  const { data: activitiesResponse, isLoading } = useGetWellnessActivitiesQuery({})
  const [deleteActivity] = useDeleteWellnessActivityMutation()

  console.log(activitiesResponse,"activitiesResponse")

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<any>(null)

  const activities = activitiesResponse?.data || []

  const handleEdit = (activity: any) => {
    setSelectedActivity(activity)
    setIsFormOpen(true)
  }

  const handleAddNew = () => {
    setSelectedActivity(null)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteActivity(id).unwrap()
          Swal.fire('Deleted!', 'Activity has been deleted.', 'success')
        } catch (error: any) {
          toast.error(error?.data?.message || 'Failed to delete activity')
        }
      }
    })
  }

  return (
    <>
      <PageHeader
        title="Wellness & Self-Care"
        subtitle="CMS · Wellness & Self-Care Management"
        description="Manage wellness activities, yoga sessions, and self-care content."
        action={
          <Button
            onClick={handleAddNew}
            className="bg-[#E91E63] w-full sm:w-auto shadow-lg shadow-rose-100"
          >
            <Plus size={18} /> Add Activity
          </Button>
        }
      />
      <div className="min-h-screen">
        {isFormOpen && (
          <ActivityModal initialData={selectedActivity} onCancel={() => setIsFormOpen(false)} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <SkeletonLoading count={6} />
          ) : (
            activities.map((activity: any) => (
              <div
                key={activity.id}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-gray-50">
                  {activity.image ? (
                    <img src={activity.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-200">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-sky-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {activity.phase_type}
                    </span>
                    <span className="bg-purple-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      Trimester {activity.trimester}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{activity.title}</h3>
                    <div className="flex items-center gap-1.5 text-rose-500 font-bold text-sm">
                      <Clock size={16} />
                      {activity.duration}m
                    </div>
                  </div>
                  
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                    {activity.short_description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                        activity.status == 1 || activity.status == '1'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-gray-50 text-gray-400'
                      }`}
                    >
                      {activity.status == 1 || activity.status == '1' ? 'Active' : 'Inactive'}
                    </span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(activity)}
                        className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(activity.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
