/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Button, PageHeader } from '../../components'
import {
  useGetRelaxationAudiosQuery,
  useUploadRelaxationAudioMutation,
  useDeleteRelaxationAudioMutation,
} from '../../redux/features/api/admin/relaxationAudio'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Music, Link, Edit, Trash2, Plus, Play, Pause } from 'lucide-react'
import { toast } from 'sonner'
import SkeletonLoading from '@/components/SkeletonLoading'

import Swal from 'sweetalert2'

export function RelaxationAudio() {
  const { data, isLoading } = useGetRelaxationAudiosQuery()
  const [uploadAudio, { isLoading: isSaving }] = useUploadRelaxationAudioMutation()
  const [deleteAudio] = useDeleteRelaxationAudioMutation()

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [audio] = useState(typeof Audio !== 'undefined' ? new Audio() : null)
  const [form, setForm] = useState({
    title: '',
    is_active: 1,
  })
  const [file, setFile] = useState<File | null>(null)

  const openEditor = (item?: any) => {
    if (item) {
      setEditingId(item.id)
      setForm({
        title: item.title,
        is_active: item.is_active,
      })
    } else {
      setEditingId(null)
      setForm({
        title: '',
        is_active: 1,
      })
    }
    setFile(null)
    setOpen(true)
  }

  const handleSave = async () => {
    if (!form.title) {
      toast.error('Please enter a title')
      return
    }
    if (!editingId && !file) {
      toast.error('Please upload an audio file')
      return
    }

    try {
      const fd = new FormData()
      if (editingId) fd.append('id', String(editingId))
      fd.append('title', form.title)
      if (file) fd.append('audio_url', file)
      fd.append('is_active', String(form.is_active))

      await uploadAudio(fd).unwrap()
      toast.success(editingId ? 'Audio updated successfully' : 'Audio added successfully')
      setOpen(false)
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to save')
    }
  }

  const handleDelete = async (id: number) => {
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
            await deleteAudio(id).unwrap()
            Swal.fire(
              'Deleted!',
              'Your audio track has been deleted.',
              'success'
            )
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to delete audio')
        }
      }
    })
  }

  const handleToggleStatus = async (item: any) => {
    console.log('Toggle status feature (design only):', item.id)
    toast.info('Status toggle design implemented')
  }

  const togglePlay = (item: any) => {
    if (!audio) return

    if (playingId === item.id) {
      audio.pause()
      setPlayingId(null)
    } else {
      if (!item.audio_url) {
        toast.error('No audio URL available')
        return
      }
      audio.src = item.audio_url
      audio.play().catch(err => {
        console.error('Playback error:', err)
        toast.error('Error playing audio')
        setPlayingId(null)
      })
      setPlayingId(item.id)
      
      audio.onended = () => {
        setPlayingId(null)
      }
    }
  }

  return (
    <>
    <PageHeader
        title="Relaxation Audio"
        subtitle="CMS · Relaxation Audio"
        description="Manage relaxation audio files, music, and meditations."
        action={
          <Button onClick={() => openEditor()} className="bg-[#E91E63] w-full sm:w-auto">
          
            <Plus size={18}/>
             Add New Audio
          </Button>
        }
      />

      {/* Desktop Table View */}
      <div className="mt-8 hidden md:block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#FEE3ED]">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800 whitespace-nowrap">
                  Audio Title
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800 whitespace-nowrap">
                  URL / Path
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800 text-center whitespace-nowrap">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold uppercase tracking-wider text-gray-800 text-right whitespace-nowrap">
                  Actions
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
                        <button
                          onClick={() => togglePlay(item)}
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all ${
                            playingId === item.id 
                              ? 'bg-pink-500 text-white shadow-lg shadow-pink-100 scale-110' 
                              : 'bg-pink-50 text-pink-500 hover:bg-pink-100 hover:scale-105'
                          }`}
                        >
                          {playingId === item.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                        </button>
                        <span className="font-semibold text-gray-900 whitespace-nowrap">{item.title}</span>
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
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight cursor-pointer transition-colors ${
                          item.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {item.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditor(item)}
                          className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:hidden">
        {isLoading ? (
          <SkeletonLoading count={3} />
        ) : data?.data?.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-medium bg-white rounded-xl border border-gray-100 italic">
            No audio tracks found.
          </div>
        ) : (
          data?.data?.map((item: any) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => togglePlay(item)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-all ${
                      playingId === item.id 
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-100 scale-105' 
                        : 'bg-pink-50 text-pink-500'
                    }`}
                  >
                    {playingId === item.id ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
                  </button>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{item.title}</h3>
                    <button
                      onClick={() => handleToggleStatus(item)}
                      className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tight cursor-pointer transition-colors ${
                        item.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {item.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => openEditor(item)}
                    className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg transition-all active:scale-90"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all active:scale-90"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <div className="pt-3 border-t border-gray-50">
                <div className="flex items-center gap-2 text-sky-600 font-mono text-[10px] bg-sky-50/50 p-2 rounded-lg break-all">
                  <Link size={12} className="shrink-0 text-gray-400" />
                  <span className="line-clamp-1">{item.audio_url || 'No URL provided'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800!">
              {editingId ? 'Edit Relaxation Audio' : 'Add New Relaxation Audio'}
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
                {editingId ? 'Change Audio File (Optional)' : 'Upload Audio File'}
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-pink-300 transition-all cursor-pointer group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Music className="w-8 h-8 mb-3 text-gray-400 group-hover:text-pink-500 transition-colors" />
                    <p className="mb-2 text-sm text-gray-500 font-medium text-center px-4 overflow-hidden text-ellipsis w-full">
                      {file ? file.name : (editingId ? <span className="text-pink-500">Click to replace audio</span> : <span className="text-pink-500">Click to upload</span>)}
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
              {isSaving ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Track' : 'Upload Track')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
