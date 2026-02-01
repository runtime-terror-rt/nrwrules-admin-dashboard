/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, Icon, PageHeader } from '../../components'
import {
  useGetServiceDataQuery,
  useCreateOrUpdateServiceMutation,
  useDeleteServiceMutation,
  useToggleServiceStatusMutation,
} from '../../redux/features/api/admin/crm'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import EditServiceForm from './services/EditServiceForm'
import { Trash2 } from 'lucide-react'

export function Services() {
  const { data } = useGetServiceDataQuery()
  const [saveService, { isLoading: isSaving }] = useCreateOrUpdateServiceMutation()
  const [deleteService] = useDeleteServiceMutation()
  const [toggleServiceStatus] = useToggleServiceStatusMutation()

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>({})
  const [files, setFiles] = useState<any>({})

  const openEditor = (service?: any) => {
    setEditing(service || null)
    setForm(service || {})
    setFiles({})
    setOpen(true)
  }

  const handleChange = (key: string, value: string) => setForm((p: any) => ({ ...p, [key]: value }))

  const handleFile = (key: string, file: File) => setFiles((p: any) => ({ ...p, [key]: file }))

  const handleSave = async () => {
    const fd = new FormData()
    if (editing?.id) fd.append('id', editing.id)
    fd.append('title', form.title || '')
    fd.append('description', form.description || '')
    fd.append('btn_text', form.btn_text || '')
    fd.append('btn_link', form.btn_link || '')
    if (files.thumbnail_img) fd.append('thumbnail_img', files.thumbnail_img)

    await saveService(fd).unwrap()
    setOpen(false)
  }

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="CMS · Services"
        description="Manage the services displayed on your landing page."
        action={
          <Button onClick={() => openEditor()} className="bg-[#E91E63]">
            <Icon name="plus" size={18} />
            Add New Service
          </Button>
        }
      />

      {/* TABLE — unchanged visually */}
      <div className="mb-8 overflow-hidden rounded-xl border">
        <table className="w-full text-sm text-left ">
          <thead className="bg-[#FFF3E0]">
            <tr>
              <th className="px-4 py-3">service</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((s: any) => (
              <tr key={s.id}>
                <td className="px-4 py-3 flex items-center gap-3">
                  {s.thumbnail_img ? (
                    <img
                      src={s.thumbnail_img}
                      alt={s.title}
                      className="w-16 h-16 object-cover bg-gray-50"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-lg text-xs text-gray-500 flex items-center justify-center">
                      No image
                    </div>
                  )}
                  {s.title}
                </td>
                <td className="px-4 py-3">{s.slug}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      s.is_active
                        ? 'px-4 py-1 text-green-500 bg-green-100 rounded-2xl'
                        : 'px-4 py-1 text-red-500 bg-red-100 rounded-2xl'
                    }
                  >
                    {s.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => openEditor(s)}
                    className="hover:cursor-pointer hover:scale-103 transition-all"
                  >
                    <Icon name="edit" size={18} />
                  </button>
                  <button
                    onClick={() => deleteService(s.id)}
                    className="hover:cursor-pointer hover:scale-103 transition-all"
                  >
                    <Trash2 size={18} className="text-red-500!" />
                  </button>
                  <button
                    onClick={() => toggleServiceStatus(s.id)}
                    className={
                      s.is_active
                        ? 'px-4 border border-[#E91E63] text-[#E91E63] hover:bg-[#E91E63] hover:text-white transition-colors rounded-2xl'
                        : 'px-4 border border-[#229ECF] text-[#229ECF] hover:bg-[#229ECF] hover:text-white transition-colors rounded-2xl'
                    }
                  >
                    {s.is_active ? 'Inactive' : 'Active'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL — GOOD UI */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-black!">
              {editing ? 'Edit Service' : 'Add Service'}
            </DialogTitle>
          </DialogHeader>

          <EditServiceForm form={form} onChange={handleChange} onFile={handleFile} />

          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Service'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
