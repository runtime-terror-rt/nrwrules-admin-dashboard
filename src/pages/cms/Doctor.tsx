import { useState } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'
import { Button, PageHeader } from '@/components'
import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useToggleDoctorStatusMutation,
  type Doctor,
} from '@/redux/features/api/admin/doctor'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import { ASSETS } from '@/constants/assets'

interface DoctorFormData {
  name: string
  specialty: string
  imageFile: File | null
  imagePreview: string
}

export function DoctorPage() {
  // API hooks
  const { data: doctorResponse, isLoading } = useGetDoctorsQuery(undefined)
  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation()
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation()
  const [deleteDoctor] = useDeleteDoctorMutation()
  const [toggleStatus] = useToggleDoctorStatusMutation()
  

  // State
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [formData, setFormData] = useState<DoctorFormData>({
    name: '',
    specialty: '',
    imageFile: null,
    imagePreview: ASSETS.images.medic,
  })

  const isSaving = isCreating || isUpdating
  const doctors = doctorResponse?.data || []

  const openAddForm = () => {
    setEditId(null)
    setFormData({
      name: '',
      specialty: '',
      imageFile: null,
      imagePreview: ASSETS.images.medic,
    })
    setIsFormOpen(true)
  }

  const openEditForm = (doctor: Doctor) => {
    setEditId(doctor.id)
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty,
      imageFile: null,
      imagePreview: doctor.image || ASSETS.images.medic,
    })
    setIsFormOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      })
    }
  }

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error('Please enter doctor name')
      return
    }
    if (!formData.specialty.trim()) {
      toast.error('Please enter specialty')
      return
    }

    try {
      // Create FormData
      const data = new FormData()
      data.append('name', formData.name.trim())
      data.append('specialty', formData.specialty.trim())

      if (formData.imageFile) {
        data.append('image', formData.imageFile)
      }

      let result
      if (editId) {
        // For update, append id
        result = await updateDoctor({ id: editId, formData: data }).unwrap()
      } else {
        result = await createDoctor(data).unwrap()
      }

      if (result.success) {
        toast.success(result.message || `Doctor ${editId ? 'updated' : 'created'} successfully!`)
        closeForm()
      }
    } catch (error: any) {
      console.error('Error saving doctor:', error)
      toast.error(error?.data?.message || `Failed to ${editId ? 'update' : 'create'} doctor`)
    }
  }

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E91E63',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      try {
        const response = await deleteDoctor(id).unwrap()
        if (response.success) {
          toast.success(response.message || 'Doctor deleted successfully!')
        }
      } catch (error: any) {
        console.error('Error deleting doctor:', error)
        toast.error(error?.data?.message || 'Failed to delete doctor')
      }
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      const response = await toggleStatus(id).unwrap()
      if (response.success) {
        toast.success(response.message || 'Status updated successfully!')
      }
    } catch (error: any) {
      console.error('Error toggling status:', error)
      toast.error(error?.data?.message || 'Failed to update status')
    }
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditId(null)
    setFormData({
      name: '',
      specialty: '',
      imageFile: null,
      imagePreview: ASSETS.images.medic,
    })
  }

  return (
    <>
      {/* Header */}
      <PageHeader
        title="Doctor"
        subtitle="CMS·Doctor"
        description="Manage Doctor information and activities for your website's users."
        action={
          <Button
            onClick={openAddForm}
            className="bg-[#E91E63] w-full sm:w-auto shadow shadow-[#E91E63]/20"
          >
            <Plus size={18} />
            Add Doctor
          </Button>
        }
      />

      {/* Form Panel */}
      {isFormOpen && (
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100 mb-8 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className=" text-xl font-semibold text-gray-700!">
              {editId ? 'Edit Doctor' : 'Add New Doctor'}
            </h2>

            <div className="flex gap-3 self-end sm:self-auto">
              <button
                onClick={closeForm}
                disabled={isSaving}
                className="px-6 py-2 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors disabled:opacity-50 cursor-pointer font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-2 bg-[#E91E63] text-white rounded-lg hover:bg-[#D81B60] transition-colors disabled:opacity-50 cursor-pointer font-medium shadow-md shadow-[#E91E63]/20"
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left – Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">Doctor Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  placeholder="Dr. Maria Schmidt"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">Specialty</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  placeholder="Pregnancy Specialist"
                />
              </div>
            </div>

            {/* Right – Photo Upload */}
            <div className="space-y-7">
              <div>
                <label className="block text-gray-700 text-sm mb-2 font-medium">Doctor Photo</label>

                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image Preview */}
                  <div className="w-40 aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-inner">
                    <img
                      src={formData.imagePreview}
                      alt="Doctor preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = ASSETS.images.medic
                      }}
                    />
                  </div>

                  {/* Upload Box */}
                  <label className="h-40 w-full sm:w-64 md:w-80 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center hover:border-cyan-400 transition-colors cursor-pointer bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <svg
                      className="h-10 w-10 text-gray-400 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-cyan-600 font-medium">Click or drag image here</p>
                    {formData.imageFile && (
                      <p className="mt-1 text-xs text-gray-500 truncate max-w-[150px]">
                        {formData.imageFile.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Doctor Cards */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <img src={ASSETS.images.medic} alt="No data" className="h-20 w-20 opacity-20 mb-4" />
          <p className="text-gray-500 font-medium">No doctors found. Add your first doctor!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {doctors.map((doctor) => {
            return (
              <div
                key={doctor.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                    <img
                      src={doctor.image || ASSETS.images.medic}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = ASSETS.images.medic
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditForm(doctor)}
                      className="text-cyan-600 hover:text-cyan-700 p-2 bg-cyan-50 rounded-lg transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="text-red-500 hover:text-red-600 p-2 bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800! mb-1">{doctor.name}</h3>
                <p className="text-cyan-600 text-sm font-medium mb-2">{doctor.specialty}</p>

                <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-4">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      doctor.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {doctor.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={!!doctor.is_active}
                      onChange={() => handleToggleStatus(doctor.id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
