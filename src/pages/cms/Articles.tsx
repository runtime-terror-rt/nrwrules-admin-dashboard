/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { Edit, Trash2, Plus, Image as ImageIcon } from 'lucide-react'
import SkeletonLoading from '@/components/SkeletonLoading'
import {
  useDeleteArticleMutation,
  useGetArticlesQuery,
  useGetCategoriesQuery,
  useUpsertArticleMutation,
} from '@/redux/features/api/admin/articles'

const ArticleModal = ({ initialData, onCancel }: any) => {
  const { data: catResponse } = useGetCategoriesQuery({})
  const [upsertArticle, { isLoading }] = useUpsertArticleMutation()

  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    long_description: '',
    category_id: '',
    phase_type: 'pregnancy',
    status: 'published',
    week: '13',
  })

  const [mainImg, setMainImg] = useState<File | null>(null)
  const [thumbImg, setThumbImg] = useState<File | null>(null)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        short_description: initialData.short_description || '',
        long_description: initialData.long_description || '',
        category_id: initialData.category_id || '',
        phase_type: initialData.phase_type || 'pregnancy',
        status: initialData.status || 'published',
        week: initialData.week?.toString() || '13',
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    if (initialData?.id) data.append('id', initialData.id)

    Object.entries(formData).forEach(([key, value]) => data.append(key, value))
    if (mainImg) data.append('main_img', mainImg)
    if (thumbImg) data.append('thumb_img', thumbImg)

    await upsertArticle(data)
    onCancel()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 shadow-xl text-black">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-bold text-sky-500! mb-4">
            {initialData ? 'Edit Content' : 'Create New Content'}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Title</label>
              <input
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl"
                value={formData.title}
                required
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., New Features Available"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Short Description</label>
              <input
                required
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Enter short description..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Full Description</label>
              <textarea
                rows={5}
                required
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl"
                value={formData.long_description}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                placeholder="Enter content description..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <select
                required
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl text-gray-400"
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
              >
                <option value="">Select Category</option>
                {catResponse?.data?.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Phase</label>
              <select
                required
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl text-gray-400"
                value={formData.phase_type}
                onChange={(e) => setFormData({ ...formData, phase_type: e.target.value })}
              >
                <option value="pregnancy">Pregnancy</option>
                <option value="postpartum">Postpartum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Publish Status</label>
              <select
                required
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl text-gray-400"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Week</label>
              <input
                required
                type="number"
                className="w-full p-3 border border-gray-100 bg-gray-50 rounded-xl"
                value={formData.week}
                onChange={(e) => setFormData({ ...formData, week: e.target.value })}
              />
            </div>
          </div>

          <div className="flex gap-8">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Thum_img</label>
              <label className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setThumbImg(e.target.files?.[0] || null)}
                />
                {thumbImg ? (
                  <img src={URL.createObjectURL(thumbImg)} className="object-cover w-full h-full" />
                ) : (
                  <ImageIcon className="text-gray-300" size={40} />
                )}
              </label>
              <span className="text-[10px] text-sky-400 mt-1 block">Click or Drag image here</span>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Main_img</label>
              <label className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setMainImg(e.target.files?.[0] || null)}
                />
                {mainImg ? (
                  <img src={URL.createObjectURL(mainImg)} className="object-cover w-full h-full" />
                ) : (
                  <ImageIcon className="text-gray-300" size={40} />
                )}
              </label>
              <span className="text-[10px] text-sky-400 mt-1 block">Click or Drag image here</span>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-rose-700 transition"
            >
              {initialData
                ? isLoading
                  ? 'Updating...'
                  : 'Update Content'
                : isLoading
                  ? 'Creating...'
                  : 'Create Content'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-orange-50 text-orange-400 border border-orange-200 px-8 py-3 rounded-xl font-bold hover:bg-orange-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const CmsArticles = () => {
  const { data: articlesResponse, isLoading } = useGetArticlesQuery({})
  const [deleteArticle] = useDeleteArticleMutation()

  const [activeTab, setActiveTab] = useState('All Posts')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)

  const articles = articlesResponse?.data || []

  const filteredArticles = articles.filter((art: any) => {
    if (activeTab === 'Published') return art.status === 'published' // Example count logic
    if (activeTab === 'Draft') return art.status === 'draft'
    return true
  })

  const handleEdit = (article: any) => {
    setSelectedArticle(article)
    setIsFormOpen(true)
  }

  const handleAddNew = () => {
    setSelectedArticle(null)
    setIsFormOpen(true)
  }

  return (
    <div className="p-6 min-h-screen text-white">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl">
        <div className="flex justify-between items-start mb-6 ">
          <div>
            <h1 className="text-2xl font-bold text-sky-400!">Content Management System</h1>
            <p className="text-gray-400 text-sm">
              Create and manage educational content, recovery guides, and articles.
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={18} /> New Content
          </button>
        </div>

        {/* Effect Info Box */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-rose-600 text-sm">
          <h3 className="font-bold mb-2 text-rose-600!">Effect on Mamabot Website:</h3>
          <ul className="list-disc ml-5 space-y-1">
            <li>Appears in Blog page</li>
            <li>Shown in Recommended Articles section</li>
            <li>Used in AI-powered content suggestions</li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 my-8">
        {['All Posts', `Published`, `Draft`].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={` border border-rose-100 rounded-xl p-4 text-rose-600 text-sm ${
              activeTab === tab
                ? 'text-rose-500 bg-rose-50 border-rose-500'
                : 'text-gray-500 bg-white hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Modal for Add/Edit */}
      {isFormOpen && (
        <ArticleModal initialData={selectedArticle} onCancel={() => setIsFormOpen(false)} />
      )}

      {/* Article List */}
      <div className="space-y-4">
        {isLoading ? (
          <SkeletonLoading count={3} />
        ) : (
          filteredArticles.map((article: any) => (
            <div
              key={article.id}
              className="bg-white text-black rounded-2xl p-5 flex flex-col gap-2"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-gray-800!">{article.title}</h3>
                  <span className="bg-sky-100 text-sky-500 px-3 py-0.5 rounded-full text-xs font-semibold">
                    {article.category?.title}
                  </span>
                </div>
                <div className="flex gap-3 ">
                  <Edit
                    size={20}
                    className="cursor-pointer text-sky-500 hover:text-sky-700"
                    onClick={() => handleEdit(article)}
                  />
                  <Trash2
                    size={20}
                    className="cursor-pointer text-rose-500 hover:text-rose-700"
                    onClick={() => deleteArticle(article.id)}
                  />
                </div>
              </div>
              <p className="text-gray-500 text-sm line-clamp-2">{article.short_description}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-sky-500 text-xs font-medium">
                  Phase: {article.phase_type}
                </span>
                <span className="text-sky-500 text-xs font-medium">
                  Created: {article.created_at?.split('T')[0]}
                </span>
                <span className="bg-green-100 text-green-600 px-3 py-0.5 rounded-md text-xs font-bold uppercase">
                  {article.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
