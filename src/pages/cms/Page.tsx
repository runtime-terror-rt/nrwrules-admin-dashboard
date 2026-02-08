/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { Icon, PageHeader } from '../../components'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { Dialog, DialogContent, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import SkeletonLoading from '@/components/SkeletonLoading'
import {
  useCreateUpdatePageMutation,
  useDeletePageMutation,
  useGetPagesQuery,
} from '@/redux/features/api/admin/pageSetting'
import TimeConverter from '@/components/TimeConverter'
import { Plus } from 'lucide-react'
import RichTextEditor from '@/components/TextEditor/RichTextEditor'

// --- Sub-Component: Page Form Modal ---
const PageFormModal = ({
  children,
  initialData,
  onSave,
}: {
  children: React.ReactNode
  initialData?: any
  onSave: (form: any) => void
}) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    meta_title: '',
    meta_description: '',
    is_active: true,
    status: 'Published',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        slug: initialData.slug || '',
        content: initialData.content || '',
        meta_title: initialData.meta_title || '',
        meta_description: initialData.meta_description || '',
        is_active: initialData.is_active ?? true,
        status: initialData.status || 'Published',
      })
    }
  }, [initialData, open])

  const editor = useEditor({
    extensions: [StarterKit],
    content: form.content,
    onUpdate: ({ editor }) => {
      setForm({ ...form, content: editor.getHTML() })
    },
  })

  const handleSubmit = () => {
    onSave(form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw]! max-w-7xl! bg-white p-0 overflow-hidden border-none shadow-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-semibold text-sky-500!">
                {initialData?.id ? 'Edit page' : 'Add New Page'}
              </h2>
              <p className="text-sm text-gray-500">Manage static content and SEO.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            {/* Left Column: Content */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Page Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-pink-100 rounded-lg p-3 text-sm focus:outline-pink-300 bg-white"
                  placeholder="Privacy Policy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border border-pink-100 rounded-lg p-3 text-sm focus:outline-pink-300 bg-white"
                  placeholder="privacy"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content</label>
                <div className="border border-pink-100 rounded-lg overflow-hidden">
                  {/* Toolbar */}
                  <div className="flex gap-3 p-3 border-b border-pink-50 bg-white">
                    <button
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={editor?.isActive('bold') ? 'text-pink-500 font-bold' : ''}
                    >
                      B
                    </button>

                    <button
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={editor?.isActive('italic') ? 'text-pink-500 italic' : ''}
                    >
                      I
                    </button>

                    <button
                      onClick={() => editor?.chain().focus().toggleUnderline().run()}
                      className={editor?.isActive('underline') ? 'text-pink-500 underline' : ''}
                    >
                      U
                    </button>
                  </div>

                  {/* Editor */}
                  {/* <EditorContent
                    editor={editor}
                    className="min-h-[220px] p-4 text-sm focus:outline-none"
                  /> */}
                  <RichTextEditor
                    value={form.content}
                    onChange={(html) => setForm({ ...form, content: html })}
                  />
                </div>
              </div>
            </div>
            {/* Right Column: Settings */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-gray-800! mb-4">Publishing Settings</h3>
                <label className="block text-xs font-bold text-[#E91E63] mb-1.5 uppercase">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full border border-pink-100 rounded-lg p-3 text-sm appearance-none bg-white mb-4"
                >
                  <option>Published</option>
                  <option>Draft</option>
                </select>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="active-status"
                      checked={form.is_active}
                      onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                      className="w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-sky-400 relative transition-all cursor-pointer before:content-[''] before:absolute before:w-4 before:h-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:left-5 before:transition-all"
                    />
                    <label htmlFor="active-status" className="text-sm font-medium text-gray-600">
                      Active status
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800! mb-4">SEO Configuration</h3>
                <label className="block text-xs font-bold text-[#E91E63] mb-1.5 uppercase">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={form.meta_title}
                  onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                  className="w-full border border-pink-100 rounded-lg p-3 text-sm mb-4"
                  placeholder="Privacy Policy - Mamabot"
                />
                <label className="block text-xs font-bold text-[#E91E63] mb-1.5 uppercase">
                  Meta Description
                </label>
                <textarea
                  rows={4}
                  value={form.meta_description}
                  onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                  className="w-full border border-pink-100 rounded-lg p-3 text-sm"
                  placeholder="Search engine description..."
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4 mt-10">
            <DialogClose className="px-6 py-2 border border-orange-400 text-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors">
              Cancel
            </DialogClose>
            <button
              onClick={handleSubmit}
              className="px-8 py-2 bg-[#E91E63] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              {initialData?.id ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// --- Main Page Component ---
export function CmsPage() {
  const { data: pages, isLoading } = useGetPagesQuery(undefined)
  const [createUpdate] = useCreateUpdatePageMutation()
  const [deletePage] = useDeletePageMutation()

  const handleSave = async (formData: any, id?: number) => {
    try {
      await createUpdate({ ...formData, id }).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-4">
      <PageHeader
        title="Pages"
        subtitle="CMS · Page Settings"
        description="Manage static pages and SEO."
        action={
          <PageFormModal onSave={(data) => handleSave(data)}>
            <button className="bg-[#E91E63] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium">
              <Plus size={18} /> Add Member
            </button>
          </PageFormModal>
        }
      />

      {/* Table Section */}
      <div className="mt-8 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#FFF8F0]">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Title</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Last Updated</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="p-10">
                  <SkeletonLoading count={3} direction="vertical" />
                </td>
              </tr>
            ) : pages?.data.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10">
                  <div className="text-center">No data available</div>
                </td>
              </tr>
            ) : (
              pages?.data?.map((page: any) => (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">{page.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">/{page.slug}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-xs font-bold border border-green-100">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    <TimeConverter timestamp={page.updated_at} />
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <PageFormModal initialData={page} onSave={(data) => handleSave(data, page.id)}>
                      <button className="text-[#E91E63] p-1 hover:bg-pink-50 rounded transition-colors">
                        <Icon name="edit" size={20} />
                      </button>
                    </PageFormModal>
                    <button
                      onClick={() => deletePage(page.id)}
                      className="text-[#E91E63] p-1 hover:bg-pink-50 rounded transition-colors"
                    >
                      <Icon name="trash" size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
