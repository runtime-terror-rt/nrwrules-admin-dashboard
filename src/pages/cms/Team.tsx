import { Button, PageHeader } from '@/components'
import SkeletonLoading from '@/components/SkeletonLoading'
import {
  useDeleteTeamMemberMutation,
  useGetTeamsQuery,
  useToggleStatusMutation,
  useUpsertTeamMemberMutation,
} from '@/redux/features/api/admin/team'
import { Edit, Plus, Trash2 } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { ASSETS } from '@/constants/assets'
import { toast } from 'sonner'

const TeamMemberModal = ({ onClose, initialData }: any) => {
  const [upsertMember, { isLoading }] = useUpsertTeamMemberMutation()
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    long_description: '',
    fb_link: '',
    linkedin_link: '',
    twitter_link: '',
    status: '1',
  })
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        status: String(initialData.status ?? '1') // Ensure status is string '1' or '0'
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    if (initialData?.id) data.append('id', initialData.id)
    data.append('name', formData.name)
    data.append('title', formData.title)
    data.append('long_description', formData.long_description)
    data.append('fb_link', formData.fb_link)
    data.append('linkedin_link', formData.linkedin_link)
    data.append('twitter_link', formData.twitter_link)
    data.append('status', formData.status)
    if (file) data.append('thumbnail_img', file)

    try {
      await upsertMember(data).unwrap()
      toast.success(initialData ? 'Team member updated successfully' : 'Team member added successfully')
      onClose()
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to save team member')
    }
  }

  const previewImage = file ? URL.createObjectURL(file) : (initialData?.thumbnail_img || null)

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-sky-500!">
              {initialData ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <p className="text-gray-400 text-sm">Manage profile details and permissions.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-orange-200 text-orange-400 rounded-xl hover:bg-orange-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-rose-500 text-white rounded-xl hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95"
            >
              {isLoading ? 'Saving...' : (initialData ? 'Update' : 'Add')}
            </button>
          </div>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Full Name</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Sarah Smith"
                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Bio</label>
              <textarea
                rows={4}
                value={formData.long_description}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                placeholder="Experienced in paediatric care..."
                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
              />
            </div>

            <h4 className="font-bold text-sky-500! mt-4">Social Links</h4>
            <div className="space-y-3">
              <input
                placeholder="Instagram link"
                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
                value={formData.twitter_link} // Mapped based on your UI
                onChange={(e) => setFormData({ ...formData, twitter_link: e.target.value })}
              />
              <input
                placeholder="Facebook link"
                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
                value={formData.fb_link}
                onChange={(e) => setFormData({ ...formData, fb_link: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Job Title / Role</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Chief Medical Officer"
                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Profile Photo</label>
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      className="object-cover w-full h-full" 
                      onError={(e) => {
                        e.currentTarget.src = ASSETS.images.medic
                      }}
                    />
                  ) : (
                   <img 
                      src={ASSETS.images.medic} 
                      className="object-cover w-full h-full" 
                    />
                  )}
                </div>
                <label className="flex-1 border-2 border-dashed border-sky-100 rounded-xl flex flex-col items-center justify-center cursor-pointer text-sky-400 text-xs">
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <span>Click or drag image here</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, status: formData.status === '1' ? '0' : '1' })
                  }
                  className={`w-12 h-6 rounded-full relative transition ${formData.status === '1' ? 'bg-sky-400' : 'bg-gray-300'}`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.status === '1' ? 'left-7' : 'left-1'}`}
                  />
                </button>
                <span className="text-sm text-gray-500">Active status</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export const CmsTeam = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: teams, isLoading } = useGetTeamsQuery({})
  const [deleteMember] = useDeleteTeamMemberMutation()
  const [toggleStatus] = useToggleStatusMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)

  const handleEdit = (member: any) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedMember(null)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-xl mx-2',
        cancelButton: 'bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-xl mx-2',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMember(id)
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your imaginary file is safe :)',
            icon: 'error',
          })
        }
      })
  }

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await toggleStatus({ id, is_active: !currentStatus }).unwrap()
      toast.success('Status updated successfully')
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status')
    }
  }

  return (
    <>
    
           <PageHeader
                   title="Team Management"
                   subtitle="CMS · Team Management"
                   description="Manage your team memoers and their roles."
                   action={
                     <Button onClick={() => handleAdd()} className="bg-[#E91E63] w-full sm:w-auto">
                     
                       <Plus size={18}/>
                       Add Member
                     </Button>
                   }
                 />

      {/* Search Bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
      </div>

      {/* Team Grid */}
      {isLoading ? (
        <SkeletonLoading count={3} direction="horizontal" />
      ) : (
        <div className="flex flex-wrap gap-4">
          {teams?.data?.teams?.length === 0 ? (
            <p>No team members found.</p>
          ) : (
            teams?.data?.teams
              ?.filter((member: any) => 
                searchTerm === '' || member.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((member: any) => (
              <div
                key={member.id}
                className="w-full md:w-78 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md overflow-hidden flex flex-col items-center p-6 text-center"
              >
                {member.thumbnail_img ? (
                  <img
                    src={member.thumbnail_img || 'https://via.placeholder.com/150'}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mb-4"
                    onError={(e) => {
                      e.currentTarget.src = ASSETS.images.medic
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center overflow-hidden">
                     <img 
                      src={ASSETS.images.medic} 
                      className="object-cover w-full h-full" 
                    />
                  </div>
                )}

                <h3 className="text-lg font-bold text-gray-800!">{member.name}</h3>
                <p className="text-sky-500 text-sm font-medium mb-2">{member.title}</p>
                <p className="text-gray-500 text-xs line-clamp-2 mb-6 h-8">
                  {member.long_description}
                </p>

                {/* ... existing code ... */}
                 
                 {/* Define isActive helper for safer boolean check */}
                 {(() => {
                   // API returns 'status' which can be 1, '1', true, etc.
                   // The toggle mutation expects 'is_active' boolean.
                   const isActive = member.status === 1 || member.status === '1' || member.status === true
                   return (
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {isActive ? 'Active' : 'Inactive'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={isActive}
                          onChange={() => handleToggleStatus(member.id, isActive)}
                        />
                        <div className={`w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all ${isActive ? 'peer-checked:after:translate-x-full peer-checked:after:border-white peer-checked:bg-sky-500' : ''}`}></div>
                      </label>
                    </div>
                   )
                 })()}

                <div className="flex w-full gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex-1 bg-sky-500 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-sky-600 transition"
                  >
                    <Edit size={18} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="px-3 py-2 border border-sky-100 bg-sky-50 text-sky-400 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <TeamMemberModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedMember}
        />
      )}
    </>
  )
}
