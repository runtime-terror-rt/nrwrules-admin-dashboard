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
import { Plus, Trash2 } from 'lucide-react'

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
          <Button onClick={() => openEditor()} className="bg-[#E91E63] w-full sm:w-auto">
          
            <Plus size={18}/>
            Add New Service
          </Button>
        }
      />

      {/* TABLE — Responsive */}
      <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[800px]">
            <thead className="bg-[#FFF3E0]">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800">Service</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800">Slug</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 text-center">Status</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-gray-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-black!">
              {data?.data?.map((s: any) => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      {s.thumbnail_img ? (
                        <img
                          src={s.thumbnail_img}
                          alt={s.title}
                          className="w-14 h-14 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-100 rounded-lg text-[10px] text-gray-400 flex items-center justify-center border border-dashed border-gray-200">
                          No image
                        </div>
                      )}
                      <span className="font-semibold text-gray-900">{s.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-500">{s.slug}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        s.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {s.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditor(s)}
                        className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Edit Service"
                      >
                        <Icon name="edit" size={18} />
                      </button>
                      <button
                        onClick={() => deleteService(s.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Service"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => toggleServiceStatus(s.id)}
                        className={`ml-2 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-xl transition-all ${
                          s.is_active
                            ? 'border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white'
                            : 'border-sky-200 text-sky-600 hover:bg-sky-600 hover:text-white'
                        }`}
                      >
                        {s.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
