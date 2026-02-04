/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, Icon, PageHeader } from '../../components'
import {
  useGetRelaxationAudiosQuery,
  useUploadRelaxationAudioMutation,
} from '../../redux/features/api/admin/relaxationAudio'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Music, Link } from 'lucide-react'
import { toast } from 'sonner'
import SkeletonLoading from '@/components/SkeletonLoading'

export function RelaxationAudio() {
  const { data, isLoading } = useGetRelaxationAudiosQuery()
  const [uploadAudio, { isLoading: isSaving }] = useUploadRelaxationAudioMutation()

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    is_active: 1,
  })
  const [file, setFile] = useState<File | null>(null)

  const openEditor = () => {
    setForm({
      title: '',
      is_active: 1,
    })
    setFile(null)
    setOpen(true)
  }

  const handleSave = async () => {
    try {
      const fd = new FormData()
      fd.append('title', form.title)
      if (file) fd.append('audio_url', file)
      fd.append('is_active', String(form.is_active))

      await uploadAudio(fd).unwrap()
      toast.success('Audio added successfully')
      setOpen(false)
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save')
    }
  }


  return (
    <>
      <PageHeader
        title="Relaxation Audio"
        subtitle="CMS · Relaxation Audio"
        description="Manage relaxation audio files, music, and meditations."
        action={
          <Button onClick={() => openEditor()} className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
           + Add New Plan
          </Button>
        }
      />

      <div className="mt-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FEE3ED]">
            <tr>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800">
                Audio Title
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800">
                URL / Path
              </th>
              <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800 text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8">
                  <SkeletonLoading count={3} />
                </td>
              </tr>
            ) : data?.data?.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-500 font-medium">
                  No audio tracks found. Click "Add New Audio" to get started.
                </td>
              </tr>
            ) : (
              data?.data?.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-50 text-pink-500">
                        <Music size={20} />
                      </div>
                      <span className="font-semibold text-gray-900">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sky-600 font-mono text-xs">
                      <Link size={14} className="shrink-0 text-gray-400" />
                      <span className="truncate max-w-[200px]" title={item.audio_url}>
                        {item.audio_url || 'No URL provided'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                        item.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {item.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800!">
              Add New Relaxation Audio
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Audio Title
              </label>
              <input
                placeholder="e.g. Deep Meditation Music"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm focus:border-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-50 transition-all font-medium text-gray-800!"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Upload Audio File
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-pink-300 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Music className="w-8 h-8 mb-3 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    <p className="mb-2 text-sm text-gray-500 font-medium">
                      {file ? file.name : <span className="text-pink-500">Click to upload</span>}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-tighter">MP3, WAV, or AAC (MAX. 10MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="audio/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div>
                <span className="text-sm font-bold text-gray-700!">Availability</span>
                <p className="text-[10px] text-gray-500 font-medium uppercase mt-0.5">
                  Visible to users in the app
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForm({ ...form, is_active: form.is_active === 1 ? 0 : 1 })}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-all duration-300 cursor-pointer ${
                  form.is_active === 1 ? 'bg-pink-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    form.is_active === 1 ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 rounded-xl bg-pink-500 text-white shadow-lg shadow-pink-100 hover:bg-pink-600 active:scale-95 transition-all"
            >
              {isSaving ? 'Uploading...' : 'Upload Track'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
